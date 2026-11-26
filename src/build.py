vendor=open('../deps/node_modules/htm/preact/standalone.umd.js').read()
css=open('style.css').read()
js='\n'.join(open(f).read() for f in ['app1.js','ill.js','app2.js','app3.js','app4.js','features.js','atrament.js','live.js','tech.js','extras.js','story.js','uphill.js','app5.js'])
page=f'''<title>Nowy mObywatel · prototyp</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Niezależna koncepcja na mObywatel Challenge">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap">
<style>
{css}
</style>
<div id="root"></div>
<script>/* htm + Preact standalone (MIT), htm@3.1.1 */
{vendor}
</script>
<script>
{js}
</script>
'''
open('../mobywatel-razem.html','w').write(page)
