#!/usr/bin/env node

import { cpSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ─── 인자 검증 ───────────────────────────────────────────────
const dest = process.argv[2];

if (!dest) {
  console.error('사용법: yarn new <경로>');
  console.error('예시:');
  console.error('  yarn new lectures/dream-coding/my-app');
  console.error('  yarn new projects/my-app');
  process.exit(1);
}

const lecturesMatch = dest.match(/^lectures\/([^/]+)\/([^/]+)$/);
const projectsMatch = dest.match(/^projects\/([^/]+)$/);

if (!lecturesMatch && !projectsMatch) {
  console.error('❌ 경로 형식이 올바르지 않습니다.');
  console.error('   lectures/<강의명>/<프로젝트명>');
  console.error('   projects/<프로젝트명>');
  process.exit(1);
}

// ─── 경로 / 이름 생성 ────────────────────────────────────────
const destPath = resolve(ROOT, dest);

if (existsSync(destPath)) {
  console.error(`❌ 이미 존재하는 경로입니다: ${dest}`);
  process.exit(1);
}

let packageName, scriptKey;

if (lecturesMatch) {
  const [, instructor, project] = lecturesMatch;
  packageName = `@${instructor}/${project}`;
  scriptKey = project;
} else {
  const [, project] = projectsMatch;
  packageName = `@project/${project}`;
  scriptKey = project;
}

// ─── 템플릿 복사 ─────────────────────────────────────────────
console.log(`\n📁 _template → ${dest}`);
cpSync(resolve(ROOT, '_template'), destPath, { recursive: true });

// ─── package.json name 업데이트 ──────────────────────────────
const pkgPath = resolve(destPath, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
pkg.name = packageName;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`📦 패키지명: ${packageName}`);

// ─── 루트 package.json에 dev 스크립트 추가 ───────────────────
const rootPkgPath = resolve(ROOT, 'package.json');
const rootPkg = JSON.parse(readFileSync(rootPkgPath, 'utf-8'));
const scriptName = `dev:${scriptKey}`;

if (rootPkg.scripts[scriptName]) {
  console.log(`⚠️  루트 스크립트 '${scriptName}' 이미 존재 — 추가하지 않음`);
} else {
  rootPkg.scripts[scriptName] = `yarn workspace ${packageName} dev`;
  writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + '\n');
  console.log(`✅ 루트 스크립트 추가: ${scriptName}`);
}

// ─── yarn install ────────────────────────────────────────────
console.log('🔗 yarn install 실행 중...\n');
execSync('yarn install', { cwd: ROOT, stdio: 'inherit' });

console.log(`\n✅ 완료! 실행하려면:\n   yarn ${scriptName}\n`);
