const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const SCREENSHOTS_DIR = './test-screenshots';

const results = {
  load: { status: 'OK', errors: [], warnings: [] },
  criticalElements: { status: 'OK', errors: [], warnings: [] },
  conversion: { status: 'OK', errors: [], warnings: [] },
  uxui: { status: 'OK', errors: [], warnings: [] },
  responsive: { status: 'OK', errors: [], warnings: [] },
  performance: { status: 'OK', errors: [], warnings: [] },
  copy: { status: 'OK', errors: [], warnings: [] },
};

function log(message, type = 'info') {
  const prefixes = {
    info: 'ℹ️',
    success: '✅',
    error: '❌',
    warning: '⚠️',
    title: '📋',
    section: '🔹',
  };
  console.log(`${prefixes[type] || 'ℹ️'} ${message}`);
}

function separator(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60));
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function testPageLoad(page) {
  separator('TEST 1: CARGA DE PÁGINA');
  const startTime = Date.now();

  try {
    const response = await page.goto(BASE_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    const loadTime = Date.now() - startTime;

    if (response && response.ok()) {
      log(`Página cargó correctamente (status: ${response.status()})`, 'success');
    } else {
      results.load.errors.push(`Status HTTP: ${response?.status()}`);
      log(`Error: Status HTTP ${response?.status()}`, 'error');
    }

    log(`Tiempo de carga: ${loadTime}ms`, 'info');

    if (loadTime > 5000) {
      results.load.warnings.push('Tiempo de carga mayor a 5 segundos');
      log('⚠️ Tiempo de carga alto (>5s)', 'warning');
    } else {
      log('Tiempo de carga aceptable', 'success');
    }

    await page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {
      results.load.warnings.push('Recursos no completaron carga');
      log('⚠️ Algunos recursos pueden no haber cargado', 'warning');
    });

  } catch (error) {
    results.load.errors.push(error.message);
    log(`Error cargando página: ${error.message}`, 'error');
  }
}

async function testCriticalElements(page) {
  separator('TEST 2: ELEMENTOS CRÍTICOS');

  try {
    const h1 = await page.locator('h1').first();
    if (await h1.count() > 0) {
      const h1Text = await h1.textContent();
      log(`H1 encontrado: "${h1Text.substring(0, 50)}..."`, 'success');
      results.criticalElements.h1 = h1Text;
    } else {
      results.criticalElements.errors.push('No se encontró H1');
      log('❌ No se encontró H1', 'error');
    }
  } catch (e) {
    results.criticalElements.errors.push(e.message);
  }

  const ctaPatterns = ['cotizar', 'agendar', 'whatsapp', 'solicitar', 'consultar', 'contactar'];
  const allText = await page.locator('body').textContent().catch(() => '');
  const hasCTA = ctaPatterns.some((pattern) =>
    allText.toLowerCase().includes(pattern)
  );

  if (hasCTA) {
    log('CTA principal encontrado', 'success');
    results.criticalElements.hasCTA = true;
  } else {
    results.criticalElements.errors.push('No se encontró CTA principal');
    log('❌ No se encontró botón de CTA principal', 'error');
  }

  const waButtons = await page.locator('a[href*="wa.me"]').count();
  if (waButtons > 0) {
    log(`Botones WhatsApp encontrados: ${waButtons}`, 'success');
    results.criticalElements.waButtons = waButtons;
  } else {
    results.criticalElements.errors.push('No se encontró enlace wa.me');
    log('❌ No se detectó botón WhatsApp', 'error');
  }

  const forms = await page.locator('form').count();
  if (forms > 0) {
    log(`Formularios encontrados: ${forms}`, 'success');
    results.criticalElements.forms = forms;
  } else {
    results.criticalElements.warnings.push('No se encontró formulario');
    log('⚠️ No se encontró formulario', 'warning');
  }

  const nav = await page.locator('nav, header').first();
  if (await nav.count() > 0) {
    log('Navbar/Header encontrado', 'success');
    results.criticalElements.hasNav = true;
  } else {
    results.criticalElements.warnings.push('No se encontró navbar');
    log('⚠️ No se encontró navbar', 'warning');
  }

  const footer = await page.locator('footer').count();
  if (footer > 0) {
    log('Footer encontrado', 'success');
    results.criticalElements.hasFooter = true;
  } else {
    results.criticalElements.warnings.push('No se encontró footer');
    log('⚠️ No se encontró footer', 'warning');
  }
}

async function testConversion(page) {
  separator('TEST 3: CONVERSIÓN');

  try {
    const viewport = page.viewportSize();
    const heroContent = await page.locator('h1, h2').first().textContent().catch(() => '');

    if (heroContent.length > 10) {
      log(`Hero encontrado: "${heroContent.substring(0, 40)}..."`, 'success');
      results.conversion.hasHeroMessage = true;
    } else {
      results.conversion.errors.push('Hero sin contenido claro');
      log('❌ Hero sin mensaje claro', 'error');
    }

    const ctaAboveFold = await page.locator('a:has-text("cotizar"), a:has-text("agendar"), a:has-text("whatsapp"), a:has-text("solicitar"), button:has-text("cotizar"), button:has-text("agendar"), button:has-text("whatsapp")').first();
    if (await ctaAboveFold.isVisible().catch(() => false)) {
      log('CTA visible en primer viewport', 'success');
      results.conversion.ctaAboveFold = true;
    } else {
      results.conversion.errors.push('CTA no visible en primer viewport');
      log('❌ CTA no visible en primer viewport', 'error');
    }

    const buttonWa = await page.locator('a[href*="wa.me"]').count();
    const buttonText = await page.locator('a:has-text("cotizar"), a:has-text("agendar"), a:has-text("whatsapp"), a:has-text("solicitar")').count();
    const buttonEl = await page.locator('button').count();
    const totalButtons = buttonWa + buttonText + buttonEl;
    if (totalButtons >= 2) {
      log(`CTAs encontrados en página: ${totalButtons}`, 'success');
      results.conversion.totalCTAs = totalButtons;
    } else {
      results.conversion.warnings.push(`Solo ${totalButtons} CTA(s) encontrado(s)`);
      log(`⚠️ Pocos CTAs encontrados: ${totalButtons}`, 'warning');
    }

    const formVisible = await page.locator('form').first().isVisible().catch(() => false);
    if (formVisible) {
      log('Formulario visible', 'success');
      results.conversion.formVisible = true;
    } else {
      results.conversion.warnings.push('Formulario no visible');
      log('⚠️ Formulario no visible', 'warning');
    }

    const inputs = await page.locator('input, textarea, select').count();
    if (inputs >= 3) {
      log(`Campos de formulario: ${inputs}`, 'success');
      results.conversion.formInputs = inputs;
    } else {
      results.conversion.warnings.push(`Solo ${inputs} campos de formulario`);
      log(`⚠️ Pocos campos en formulario: ${inputs}`, 'warning');
    }
  } catch (e) {
    results.conversion.errors.push(e.message);
    log(`Error en test de conversión: ${e.message}`, 'error');
  }
}

async function testUXUI(page) {
  separator('TEST 4: UX/UI');

  try {
    const buttons = await page.locator('button, a').all();
    let clickableCount = 0;
    for (const btn of buttons) {
      if (await btn.isVisible().catch(() => false)) {
        clickableCount++;
      }
    }
    log(`Elementos clickeables: ${clickableCount}`, 'success');

    const links = await page.locator('a[href]').all();
    let brokenLinks = 0;
    for (const link of links.slice(0, 20)) {
      const href = await link.getAttribute('href').catch(() => '');
      if (href && !href.startsWith('#') && !href.startsWith('javascript')) {
        try {
          if (href.startsWith('http') && !href.includes('localhost') && !href.includes('wa.me')) {
            const response = await link.evaluate((node) => {
              return fetch(node.href, { method: 'HEAD' }).then((r) => r.status).catch(() => 0);
            });
            if (response >= 400) {
              brokenLinks++;
            }
          }
        } catch (e) {
        }
      }
    }
    if (brokenLinks > 0) {
      results.uxui.warnings.push(`${brokenLinks} enlaces potencialmente rotos`);
      log(`⚠️ ${brokenLinks} enlaces potencialmente rotos`, 'warning');
    } else {
      log('No se detectaron enlaces rotos', 'success');
    }

    const overlaps = await page.evaluate(() => {
      const elements = document.querySelectorAll('button, a, input, [role="button"]');
      const rects = [];
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          rects.push({ top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right });
        }
      });
      let overlaps = 0;
      for (let i = 0; i < rects.length; i++) {
        for (let j = i + 1; j < rects.length; j++) {
          if (
            rects[i].top < rects[j].bottom &&
            rects[i].bottom > rects[j].top &&
            rects[i].left < rects[j].right &&
            rects[i].right > rects[j].left
          ) {
            overlaps++;
          }
        }
      }
      return overlaps;
    });

    if (overlaps > 5) {
      results.uxui.warnings.push('Posibles elementos superpuestos');
      log(`⚠️ Posibles elementos superpuestos: ${overlaps}`, 'warning');
    } else {
      log('Sin elementos superpuestos detectados', 'success');
    }
  } catch (e) {
    results.uxui.errors.push(e.message);
  }
}

async function testResponsive(page, viewport, deviceName) {
  separator(`TEST 5: RESPONSIVE (${deviceName})`);

  try {
    await page.setViewportSize(viewport);
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const bodyOverflow = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    if (bodyOverflow) {
      results.responsive.warnings.push(`Overflow horizontal en ${deviceName}`);
      log(`⚠️ Overflow horizontal en ${deviceName}`, 'warning');
    } else {
      log(`Sin overflow en ${deviceName}`, 'success');
    }

    const ctaVisible = await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('a, button'));
      return candidates.some((el) => {
        const text = (el.textContent || '').toLowerCase();
        if (!/(cotizar|whatsapp|agendar|inspecci[oó]n)/i.test(text)) {
          return false;
        }
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        const visible =
          style.visibility !== 'hidden' &&
          style.display !== 'none' &&
          rect.width > 0 &&
          rect.height > 0;
        const withinViewport = rect.top < window.innerHeight && rect.bottom > 0;
        return visible && withinViewport;
      });
    });
    if (ctaVisible) {
      log(`CTA visible en ${deviceName}`, 'success');
    } else {
      results.responsive.warnings.push(`CTA no visible en ${deviceName}`);
      log(`⚠️ CTA no visible en ${deviceName}`, 'warning');
    }

    const textLegible = await page.locator('body').evaluate((el) => {
      const fontSize = window.getComputedStyle(el).fontSize;
      return parseInt(fontSize) >= 12;
    });
    if (textLegible) {
      log(`Texto legible en ${deviceName}`, 'success');
    } else {
      results.responsive.warnings.push(`Texto muy pequeño en ${deviceName}`);
      log(`⚠️ Texto muy pequeño en ${deviceName}`, 'warning');
    }
  } catch (e) {
    results.responsive.errors.push(`Error en ${deviceName}: ${e.message}`);
  }
}

async function takeScreenshots(page) {
  separator('TEST 6: SCREENSHOTS');

  try {
    ensureDir(SCREENSHOTS_DIR);

    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'desktop.png'),
      fullPage: false,
    });
    log('Screenshot desktop guardado', 'success');

    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'mobile.png'),
      fullPage: false,
    });
    log('Screenshot mobile guardado', 'success');

    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'tablet.png'),
      fullPage: false,
    });
    log('Screenshot tablet guardado', 'success');
  } catch (e) {
    log(`Error tomando screenshots: ${e.message}`, 'error');
  }
}

async function testPerformance(page) {
  separator('TEST 7: PERFORMANCE');

  try {
    const metrics = await page.evaluate(() => {
      return {
        domContentLoaded: performance.timing?.domContentLoadedEventStart || 0,
        loadComplete: performance.timing?.loadEventEnd || 0,
        domDepth: document.querySelectorAll('*').length,
      };
    });

    log(`Elementos DOM: ${metrics.domDepth}`, 'info');

    if (metrics.domDepth > 5000) {
      results.performance.warnings.push('DOM muy grande puede afectar performance');
      log('⚠️ DOM muy grande (>5000 elementos)', 'warning');
    }

    const images = await page.locator('img').count();
    const heavyImages = await page.locator('img[src*=".jpg"], img[src*=".png"]').count();
    log(`Imágenes: ${images} (${heavyImages} potenciamente pesadas)`, 'info');

    const scripts = await page.locator('script[src]').count();
    log(`Scripts externos: ${scripts}`, 'info');
  } catch (e) {
    results.performance.errors.push(e.message);
  }
}

async function testCopy(page) {
  separator('TEST 8: COPY (INTELIGENTE)');

  try {
    const heroText = await page.locator('h1, h2').first().textContent().catch(() => '');
    const heroLower = heroText.toLowerCase();

    const weakWords = ['bienvenido', 'hola', 'hello', 'gracias por venir'];
    const hasWeak = weakWords.some((w) => heroLower.includes(w));

    if (hasWeak) {
      results.copy.warnings.push('Hero usa texto genérico');
      log('⚠️ Hero usa texto genérico', 'warning');
    } else {
      log('Hero no usa texto genérico', 'success');
    }

    const benefitPatterns = ['ahorra', 'evita', 'detect', 'problem', 'dinero', 'seguridad'];
    const hasBenefit = benefitPatterns.some((p) => heroLower.includes(p));

    if (hasBenefit) {
      log('Hero menciona beneficio claro', 'success');
      results.copy.hasBenefit = true;
    } else {
      results.copy.warnings.push('Hero no menciona beneficio claro');
      log('⚠️ Hero no menciona beneficio claro', 'warning');
    }

    const bodyText = await page.locator('body').textContent().catch(() => '');
    const sections = await page.locator('section, div[id], div[class*="section"]').count();
    log(`Secciones detectadas: ${sections}`, 'info');

    const hasProblemSection = bodyText.toLowerCase().includes('problema') || bodyText.toLowerCase().includes('falla') || bodyText.toLowerCase().includes('detec');
    const hasSolutionSection = bodyText.toLowerCase().includes('solución') || bodyText.toLowerCase().includes('servicio') || bodyText.toLowerCase().includes('inspecci');
    const hasCTASection = bodyText.toLowerCase().includes('contact') || bodyText.toLowerCase().includes('cotizar') || bodyText.toLowerCase().includes('whatsapp');

    if (hasProblemSection) {
      log('Sección problema encontrada', 'success');
      results.copy.hasProblem = true;
    }
    if (hasSolutionSection) {
      log('Sección solución encontrada', 'success');
      results.copy.hasSolution = true;
    }
    if (hasCTASection) {
      log('Sección CTA encontrada', 'success');
      results.copy.hasCTA = true;
    }
  } catch (e) {
    results.copy.errors.push(e.message);
  }
}

function generateReport() {
  separator('REPORTE FINAL');

  let totalErrors = 0;
  let totalWarnings = 0;

  Object.keys(results).forEach((key) => {
    totalErrors += results[key].errors.length;
    totalWarnings += results[key].warnings.length;
  });

  let status = 'OK';
  if (totalErrors > 5 || totalWarnings > 10) {
    status = 'CRITICAL';
  } else if (totalErrors > 0 || totalWarnings > 5) {
    status = 'NEEDS IMPROVEMENT';
  }

  if (status === 'OK') {
    log(`Estado general: ${status} - Landing lista para producción`, 'success');
  } else if (status === 'NEEDS IMPROVEMENT') {
    log(`Estado general: ${status} - Requiere mejoras`, 'warning');
  } else {
    log(`Estado general: ${status} - Revisar errores críticos`, 'error');
  }

  console.log(`\n📊 RESUMEN:`);
  console.log(`   Errores: ${totalErrors}`);
  console.log(`   Advertencias: ${totalWarnings}\n`);

  if (totalErrors > 0 || totalWarnings > 0) {
    console.log('\n❌ ERRORES ENCONTRADOS:');
    Object.keys(results).forEach((key) => {
      if (results[key].errors.length > 0) {
        console.log(`\n[${key.toUpperCase()}]:`);
        results[key].errors.forEach((e) => console.log(`   - ${e}`));
      }
    });

    console.log('\n⚠️ ADVERTENCIAS:');
    Object.keys(results).forEach((key) => {
      if (results[key].warnings.length > 0) {
        console.log(`\n[${key.toUpperCase()}]:`);
        results[key].warnings.forEach((w) => console.log(`   - ${w}`));
      }
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log('  MEJORAS RECOMENDADAS');
  console.log('='.repeat(60));

  const mejoras = [];

  if (results.criticalElements.errors.includes('No se encontró H1')) {
    mejoras.push('Agregar H1 principal descriptivo');
  }
  if (!results.criticalElements.waButtons) {
    mejoras.push('Agregar botón WhatsApp con enlace wa.me');
  }
  if (!results.conversion.ctaAboveFold) {
    mejoras.push('确保 CTA visible above the fold');
  }
  if (results.copy.warnings.includes('Hero no menciona beneficio claro')) {
    mejoras.push('Mejorar copy del hero con beneficio claro');
  }
  if (results.load.warnings.includes('Tiempo de carga mayor a 5 segundos')) {
    mejoras.push('Optimizar tiempo de carga (imágenes, scripts)');
  }
  if (!results.criticalElements.forms) {
    mejoras.push('Agregar formulario de contacto');
  }
  if (results.responsive.responsive?.some((w) => w.includes('Overflow'))) {
    mejoras.push('Revisar responsive design');
  }

  if (mejoras.length === 0) {
    log('No hay mejoras críticas recomendadas', 'success');
  } else {
    console.log('\nMEJORAS:');
    mejoras.forEach((m, i) => console.log(`   ${i + 1}. ${m}`));
  }

  console.log('\n' + '='.repeat(60));
  console.log('  PRÓXIMOS PASOS');
  console.log('='.repeat(60));
  console.log('\n1. Corrigiere los errores listados');
  console.log('2. Vuelve a ejecutar: node test-landing-advanced.js');
  console.log('3. Repite hasta que el estado sea "OK"');
  console.log('\n');

  return { status, errors: totalErrors, warnings: totalWarnings };
}

async function runTests() {
  console.log('\n' + '#'.repeat(60));
  console.log('#  SISTEMA DE TESTING AVANZADO PARA LANDING PAGES');
  console.log('#  Auditando: ' + BASE_URL);
  console.log('#'.repeat(60) + '\n');

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await testPageLoad(page);
    await testCriticalElements(page);
    await testConversion(page);
    await testUXUI(page);

    await testResponsive(page, { width: 1920, height: 1080 }, 'Desktop');
    await testResponsive(page, { width: 768, height: 1024 }, 'Tablet');
    await testResponsive(page, { width: 375, height: 812 }, 'Mobile');

    await takeScreenshots(page);
    await testPerformance(page);
    await testCopy(page);

    await browser.close();

    if (consoleErrors.length > 0) {
      console.log('\n⚠️ ERRORES DE CONSOLA:');
      consoleErrors.slice(0, 5).forEach((e) => console.log(`   - ${e.substring(0, 100)}`));
    }

    const report = generateReport();
    return report;
  } catch (error) {
    log(`Error ejecutando tests: ${error.message}`, 'error');
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

if (require.main === module) {
  runTests()
    .then((report) => {
      process.exit(report.errors > 0 ? 1 : 0);
    })
    .catch((error) => {
      console.error('❌ Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { runTests, results };
