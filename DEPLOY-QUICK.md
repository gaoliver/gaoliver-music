# ⚡ Deploy Rápido - GitHub Pages

## 🚀 Guia em 5 Minutos

### Passo 1: Criar Repositório no GitHub
```bash
# Ir para: https://github.com/new
Nome: gaoliver-music
Visibilidade: Public
Criar repositório
```

### Passo 2: Enviar Código
```bash
cd /Users/gabrielramos/Documents/STP/Config/etc/gaoliver-music

# Se ainda não inicializou
git init
git add .
git commit -m "Initial commit"

# Adicionar repositório remoto (SUBSTITUIR SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/gaoliver-music.git
git branch -M main
git push -u origin main
```

### Passo 3: Configurar GitHub Pages
```
1. Repositório → Settings → Pages
2. Source: GitHub Actions (selecione esta opção)
3. Settings → Actions → General
4. Workflow permissions: Read and write ✓
5. Save
```

### Passo 4: Deploy Automático
```
✅ Push feito → Deploy inicia automaticamente
Ver progresso: Aba "Actions" no GitHub
Aguardar ✅ (2-3 minutos)
```

### Passo 5: Configurar Domínio (gaoliver-music.com)
```
1. Settings → Pages → Custom domain
2. Digite: gaoliver-music.com
3. Save

4. No provedor de domínio, adicionar:
   
   Tipo A (4 registros):
   @ → 185.199.108.153
   @ → 185.199.109.153
   @ → 185.199.110.153
   @ → 185.199.111.153
   
   Tipo CNAME:
   www → SEU-USUARIO.github.io

5. Aguardar DNS propagar (5 min - 48h)
6. Habilitar HTTPS ✓
```

---

## 🎯 URLs Finais

**Com domínio customizado:**
```
https://gaoliver-music.com
https://www.gaoliver-music.com
```

**Sem domínio (temporário):**
```
https://SEU-USUARIO.github.io/gaoliver-music
```

---

## 🔄 Atualizar Site

```bash
# Fazer mudanças no código
git add .
git commit -m "Update: descrição"
git push

# Deploy automático acontece!
# Ver em: GitHub → Actions
```

---

## ✅ Verificar se Funcionou

1. **Actions**: Repositório → Actions → Ver workflow ✅
2. **DNS**: https://dnschecker.org/#A/gaoliver-music.com
3. **Site**: https://gaoliver-music.com
4. **HTTPS**: Cadeado verde no navegador 🔒

---

## 🐛 Problemas Comuns

### Site não carrega (404)
```
- Aguardar DNS propagar (até 48h)
- Limpar cache: Ctrl+Shift+R
- Verificar domínio em Settings → Pages
```

### Deploy falhou
```
- Ver logs em Actions
- Testar local: npm run build
- Corrigir erros e fazer push novamente
```

### Mudanças não aparecem
```
- Aguardar workflow completar (Actions)
- Limpar cache do navegador
- Aguardar CDN (~2 minutos)
- Testar em aba anônima
```

---

## 📚 Guia Completo

Ver: **[DEPLOY.md](./DEPLOY.md)** para instruções detalhadas.

---

Pronto! Seu site estará no ar em minutos! 🎸✨

