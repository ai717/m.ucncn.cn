const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT_DIR = path.resolve(__dirname, '..');
const zhProjects = require('../data/projects.json');
const enProjects = require('../data/projects_en.json');

// 1. 静态语法检查 (Static Syntax Parse)
['index.html', 'en/index.html'].forEach(rel => {
  const filePath = path.join(ROOT_DIR, rel);
  const html = fs.readFileSync(filePath, 'utf8');
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  let idx = 0;
  while ((m = scriptRegex.exec(html)) !== null) {
    idx++;
    const tm = m[0].match(/type=["']([^"']+)["']/i);
    if (tm && (tm[1].includes('json') || tm[1].includes('tailwind'))) continue;
    const code = m[1];
    if (!code.trim()) continue;
    try {
      new vm.Script(code, { filename: `${rel}:script[${idx}]` });
      console.log(`✓ ${rel} script[${idx}] 语法解析 OK`);
    } catch (e) {
      console.error(`❌ 语法错误在 ${rel} script[${idx}]:`, e);
      process.exit(1);
    }
  }
});

// 2. 运行时卡片渲染与弹窗逻辑仿真沙箱校验 (Runtime Execution & ReferenceError Gatekeeper)
['index.html', 'en/index.html'].forEach(rel => {
  const isEn = rel.startsWith('en');
  const projectList = isEn ? enProjects : zhProjects;
  const filePath = path.join(ROOT_DIR, rel);
  const html = fs.readFileSync(filePath, 'utf8');
  const scriptRegex = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = scriptRegex.exec(html)) !== null) {
    const code = m[1];
    if (code.includes('renderCards')) {
      const mockElement = () => ({
        classList: { add: () => {}, remove: () => {} },
        innerHTML: '',
        innerText: '',
        value: '',
        style: {},
        setAttribute: () => {},
        addEventListener: () => {}
      });
      const sandbox = {
        window: { addEventListener: () => {}, location: { hash: '' } },
        document: {
          getElementById: mockElement,
          querySelectorAll: () => [],
          querySelector: mockElement
        },
        console: { log: () => {}, warn: () => {}, error: console.error },
        currentUserProfile: { unlocked_projects: [] },
        allProjects: projectList,
        setTimeout: () => {},
        localStorage: { getItem: () => null, setItem: () => {} }
      };
      vm.createContext(sandbox);
      try {
        vm.runInContext(code, sandbox);
        if (typeof sandbox.renderCards === 'function') {
          sandbox.renderCards(projectList);
          console.log(`✓ ${rel} renderCards(${projectList.length} 个真实项目) 运行时渲染通过`);
        }
        if (typeof sandbox.openProjectModal === 'function' && projectList.length > 0) {
          sandbox.openProjectModal(projectList[0].id);
          console.log(`✓ ${rel} openProjectModal("${projectList[0].id}") 弹窗逻辑运行时通过`);
        }
      } catch (runtimeErr) {
        console.error(`\n❌ 【致命运行时错误】${rel} 运行时崩溃: ${runtimeErr.message}`);
        console.error(runtimeErr.stack);
        process.exit(1);
      }
    }
  }
});

console.log('✓ 静态语法与运行时仿真双重门禁 100% 通过！\n');
