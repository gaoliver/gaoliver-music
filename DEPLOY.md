# 🚀 Guia de Deploy - GitHub Pages

## Visão Geral

Este guia mostra como publicar seu site no GitHub Pages com deploy automático.

---

## 📋 Pré-requisitos

- [x] Conta no GitHub
- [x] Git instalado
- [x] Repositório criado no GitHub
- [x] Código do site pronto

---

## 🎯 Opções de Deploy

### Opção 1: Domínio Customizado (gaoliver-music.com) ✅ Recomendado
```
URL final: https://gaoliver-music.com
```

### Opção 2: Subdomínio GitHub
```
URL final: https://seu-usuario.github.io/gaoliver-music
```

**Para este guia, vamos usar a Opção 1 (domínio customizado).**

---

## 🔧 Passo 1: Preparar o Repositório

### 1.1 Inicializar Git (se ainda não fez)

```bash
cd /Users/gabrielramos/Documents/STP/Config/etc/gaoliver-music

# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Initial commit: G.A. Oliver website"
```

### 1.2 Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome do repositório: `gaoliver-music`
3. Descrição: "Official website for G.A. Oliver - Heavy Metal Artist"
4. Visibilidade: **Public** (necessário para GitHub Pages gratuito)
5. **NÃO** marque "Add a README file"
6. Clique em "Create repository"

### 1.3 Conectar ao Repositório Remoto

```bash
# Adicionar origin remoto (substitua SEU-USUARIO pelo seu username)
git remote add origin https://github.com/SEU-USUARIO/gaoliver-music.git

# Renomear branch para main (se necessário)
git branch -M main

# Fazer push inicial
git push -u origin main
```

---

## ⚙️ Passo 2: Configurar GitHub Pages

### 2.1 Habilitar GitHub Pages

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Source: **GitHub Actions** ✅
   - (NÃO use "Deploy from a branch")

### 2.2 Configurar Permissões

1. Ainda em **Settings**
2. Vá para **Actions** → **General**
3. Em "Workflow permissions", selecione:
   - ✅ **Read and write permissions**
4. Clique em **Save**

---

## 🌐 Passo 3: Configurar Domínio Customizado

### 3.1 Adicionar Domínio no GitHub

1. Em **Settings** → **Pages**
2. Em **Custom domain**, digite: `gaoliver-music.com`
3. Clique em **Save**
4. Aguarde a verificação DNS

### 3.2 Configurar DNS no seu Provedor de Domínio

No painel do seu provedor de domínio (GoDaddy, Namecheap, etc.), adicione:

#### Registros A (para domínio raiz)
```
Tipo: A
Nome: @
Valor: 185.199.108.153

Tipo: A
Nome: @
Valor: 185.199.109.153

Tipo: A
Nome: @
Valor: 185.199.110.153

Tipo: A
Nome: @
Valor: 185.199.111.153
```

#### Registro CNAME (para www)
```
Tipo: CNAME
Nome: www
Valor: SEU-USUARIO.github.io
```

**⏱️ Propagação DNS:** Pode levar de 5 minutos a 48 horas.

### 3.3 Verificar DNS

Use estas ferramentas para verificar:
```
https://www.whatsmydns.net/#A/gaoliver-music.com
https://dnschecker.org/#A/gaoliver-music.com
```

### 3.4 Habilitar HTTPS

1. Volte em **Settings** → **Pages**
2. Marque ✅ **Enforce HTTPS**
3. Aguarde o certificado SSL ser gerado (~5 minutos)

---

## 🚀 Passo 4: Deploy Automático

### 4.1 Como Funciona

O workflow já está configurado em `.github/workflows/deploy.yml`:

```yaml
Gatilho: Push para branch 'main'
Processo:
1. ✅ Faz checkout do código
2. ✅ Instala dependências (npm ci)
3. ✅ Compila o site (npm run build)
4. ✅ Faz deploy para GitHub Pages
```

### 4.2 Fazer Deploy

**Cada vez que você fizer push, o deploy acontece automaticamente!**

```bash
# Fazer mudanças no código
git add .
git commit -m "Update: descrição da mudança"
git push

# Deploy automático iniciará!
```

### 4.3 Acompanhar o Deploy

1. Vá para o repositório no GitHub
2. Clique na aba **Actions**
3. Veja o workflow "Deploy to GitHub Pages" executando
4. Aguarde ✅ completar (~2-3 minutos)

### 4.4 Acessar o Site

Após o deploy completar:
```
https://gaoliver-music.com
```

---

## 🛠️ Comandos Úteis

### Deploy Manual (pela primeira vez)

```bash
# Build local para testar
npm run build

# Visualizar build local
npm run preview

# Se tudo OK, fazer push
git push
```

### Forçar Novo Deploy

```bash
# Criar commit vazio para forçar deploy
git commit --allow-empty -m "Trigger deploy"
git push
```

### Ver Logs de Deploy

```bash
# Na aba Actions do GitHub
# Clique no workflow mais recente
# Clique no job "build" ou "deploy"
# Veja os logs detalhados
```

---

## ⚡ Otimizações de Performance

### Cache de Build (já configurado)

O workflow usa cache do npm para builds mais rápidos:
```yaml
cache: 'npm'  # Economiza ~30 segundos por build
```

### Build Otimizado (já configurado)

No `vite.config.ts`:
```typescript
build: {
  minify: 'terser',  // Minificação agressiva
  sourcemap: false,  // Sem sourcemaps em produção
}
```

---

## 🔍 Solução de Problemas

### Deploy Falhando

**Problema:** Workflow falha na etapa de build  
**Solução:**
```bash
# Testar build localmente
npm run build

# Ver erros específicos
# Corrigir e fazer push novamente
```

**Problema:** "Permission denied" no workflow  
**Solução:** Verificar permissões em Settings → Actions → General

### Site Não Carregando

**Problema:** 404 ao acessar gaoliver-music.com  
**Soluções:**
1. Verificar DNS propagou (pode levar até 48h)
2. Verificar domínio configurado em Settings → Pages
3. Aguardar certificado SSL (~5 minutos)
4. Limpar cache do navegador (Ctrl+Shift+R)

**Problema:** Imagens não carregam  
**Solução:** 
- Verificar paths em `vite.config.ts`
- Se usar github.io, mudar `base: '/'` para `base: '/gaoliver-music/'`

### Mudanças Não Aparecem

**Problema:** Site não atualiza após push  
**Soluções:**
1. Verificar workflow completou em Actions
2. Limpar cache: Ctrl+Shift+R (Chrome) ou Cmd+Shift+R (Mac)
3. Testar em aba anônima
4. Aguardar CDN do GitHub (~1-2 minutos)

---

## 📊 Monitoramento

### GitHub Insights

Veja estatísticas em:
```
Repositório → Insights → Traffic
```

Métricas disponíveis:
- Visitantes únicos
- Visualizações de página
- Clones do repositório
- Sites de referência

### Google Analytics (opcional)

Adicione ao `index.html` antes do `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔐 Segurança

### Secrets do GitHub (se necessário)

Para variáveis sensíveis:
1. Settings → Secrets and variables → Actions
2. New repository secret
3. Use em workflow: `${{ secrets.NOME_SECRET }}`

### Proteção de Branch

Recomendado para produção:
1. Settings → Branches
2. Add branch protection rule
3. Branch name: `main`
4. Marque: "Require status checks to pass before merging"

---

## 🚀 Workflow Completo

### Desenvolvimento Local
```bash
npm run dev          # Servidor de desenvolvimento
```

### Testar Build
```bash
npm run build        # Compilar
npm run preview      # Visualizar build local
```

### Deploy
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push
# Deploy automático inicia!
```

### Verificar
```
1. GitHub → Actions (ver progresso)
2. Aguardar ✅ completar
3. Acessar https://gaoliver-music.com
4. Limpar cache se necessário
```

---

## 📝 Checklist Final

Antes do primeiro deploy:
- [ ] Código commitado no Git
- [ ] Repositório criado no GitHub
- [ ] Código enviado (git push)
- [ ] GitHub Pages habilitado (Source: GitHub Actions)
- [ ] Permissões configuradas (Read and write)
- [ ] Domínio customizado adicionado
- [ ] DNS configurado no provedor
- [ ] DNS propagado (verificar)
- [ ] HTTPS habilitado
- [ ] Primeiro deploy completado
- [ ] Site acessível em gaoliver-music.com

---

## 🎉 Pronto!

Seu site agora está:
- ✅ **Publicado** em gaoliver-music.com
- ✅ **Deploy automático** a cada push
- ✅ **HTTPS** com certificado SSL
- ✅ **Performance otimizada**
- ✅ **Grátis** no GitHub Pages!

---

## 📚 Links Úteis

- GitHub Pages Docs: https://docs.github.com/pages
- Vite Docs: https://vitejs.dev/guide/static-deploy.html
- Custom Domain Guide: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- DNS Checker: https://dnschecker.org

---

## 🆘 Suporte

**Problemas?**
1. Verificar logs em GitHub Actions
2. Testar build local: `npm run build`
3. Consultar documentação do GitHub Pages
4. Verificar issues semelhantes no GitHub

Seu site está pronto para o mundo! 🎸🚀✨

