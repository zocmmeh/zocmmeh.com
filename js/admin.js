/* ============================================
   中山大学中山眼科中心茂名医院 - 管理员编辑模块
   ============================================ */

// ===== 管理员密码，修改此处即可 =====
const ADMIN_PASSWORD = 'zoc2026';

(function() {
  const AUTH_KEY = 'admin_auth';
  const AUTH_TIME_KEY = 'admin_auth_time';
  const EXPIRE_MS = 24 * 60 * 60 * 1000; // 24小时

  function isAuthed() {
    const auth = localStorage.getItem(AUTH_KEY);
    const time = parseInt(localStorage.getItem(AUTH_TIME_KEY), 10);
    return auth === 'true' && time && (Date.now() - time < EXPIRE_MS);
  }

  function setAuth() {
    localStorage.setItem(AUTH_KEY, 'true');
    localStorage.setItem(AUTH_TIME_KEY, Date.now().toString());
  }

  function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_TIME_KEY);
  }

  // 创建模态框
  function createModal() {
    if (document.getElementById('adminModal')) return;
    const overlay = document.createElement('div');
    overlay.id = 'adminModal';
    overlay.className = 'admin-modal-overlay';
    overlay.innerHTML = `
      <div class="admin-modal">
        <h3>🔒 管理员登录</h3>
        <input type="password" id="adminPwdInput" placeholder="请输入管理员密码" autocomplete="off">
        <div class="modal-error" id="adminError">密码错误</div>
        <div class="modal-btns">
          <button class="btn-cancel" id="adminCancel">取消</button>
          <button class="btn-confirm" id="adminConfirm">确认</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('adminConfirm').addEventListener('click', handleLogin);
    document.getElementById('adminCancel').addEventListener('click', () => {
      overlay.classList.remove('show');
    });
    document.getElementById('adminPwdInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleLogin();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('show');
    });
  }

  function handleLogin() {
    const pwd = document.getElementById('adminPwdInput');
    const err = document.getElementById('adminError');
    if (pwd.value === ADMIN_PASSWORD) {
      setAuth();
      document.getElementById('adminModal').classList.remove('show');
      pwd.value = '';
      enterEditMode();
    } else {
      err.style.display = 'block';
      pwd.value = '';
      pwd.focus();
    }
  }

  // 创建保存按钮
  function createSaveBtn() {
    if (document.getElementById('adminSaveBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'adminSaveBtn';
    btn.className = 'admin-save-btn';
    btn.innerHTML = '💾 保存修改';
    document.body.appendChild(btn);
    btn.addEventListener('click', () => {
      showToast('✅ 内容已保存');
    });
  }

  // 创建Toast
  function showToast(msg) {
    let toast = document.getElementById('adminToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'adminToast';
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  function enterEditMode() {
    const toggle = document.getElementById('adminToggle');
    if (toggle) {
      toggle.textContent = '✏️ 编辑';
      toggle.title = '退出编辑';
    }

    // 给所有文本节点添加contenteditable
    const editableSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, li, td, th, label, button, .dept-floor, .doctor-title, .stat-label, .stats-label, .logo-title, .logo-subtitle';
    document.querySelectorAll(editableSelectors).forEach(el => {
      el.setAttribute('contenteditable', 'true');
    });

    document.body.classList.add('admin-editing');

    const saveBtn = document.getElementById('adminSaveBtn');
    if (saveBtn) saveBtn.classList.add('show');
  }

  function exitEditMode() {
    const toggle = document.getElementById('adminToggle');
    if (toggle) {
      toggle.textContent = '⚙️';
      toggle.title = '管理员';
    }

    document.querySelectorAll('[contenteditable]').forEach(el => {
      el.removeAttribute('contenteditable');
    });

    document.body.classList.remove('admin-editing');

    const saveBtn = document.getElementById('adminSaveBtn');
    if (saveBtn) saveBtn.classList.remove('show');
  }

  let editMode = false;

  function toggleEditMode() {
    editMode = !editMode;
    if (editMode) {
      enterEditMode();
    } else {
      exitEditMode();
      clearAuth();
    }
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    createModal();
    createSaveBtn();

    const toggleBtn = document.getElementById('adminToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        if (isAuthed()) {
          toggleEditMode();
        } else {
          document.getElementById('adminModal').classList.add('show');
          setTimeout(() => {
            document.getElementById('adminPwdInput').focus();
          }, 100);
        }
      });
    }

    // 恢复编辑状态
    if (isAuthed()) {
      enterEditMode();
      editMode = true;
    }
  });
})();
