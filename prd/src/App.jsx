import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Upload, Globe, Settings, ChevronLeft, 
  Send, HelpCircle, CheckCircle, XCircle, Clock, AlertCircle, 
  Copy, ExternalLink, Play, Trash2, Check, RefreshCw, X,
  LayoutTemplate, FileCode2, Zap, ShieldCheck, GitCommit,
  Layout, Activity, Code, Server, Terminal, Lock, LogOut,
  ChevronDown, Search, ArrowRight, CreditCard, Sparkles, MessageSquare, FilePlus,
  MonitorPlay, Store, Briefcase, Feather, CheckCircle2, MousePointerClick
} from 'lucide-react';

// --- [Mock Data] ---
const INITIAL_PROJECTS = [
  { 
    id: 1, 
    name: 'cafe-landing-page', 
    status: 'Draft', 
    url: '', 
    updated: 'Updated 2 hours ago', 
    version: 'v1',
    commits: [
      { hash: 'a1b2c3d', msg: '초기 템플릿 생성', time: '2 hours ago' }
    ],
    analytics: false
  }
];

const MOCK_REPOS = [
  { name: 'user/react-ecommerce', updated: '2 days ago' },
  { name: 'user/nextjs-blog', updated: '5 days ago' },
  { name: 'user/old-portfolio', updated: 'last month' },
];

// --- [Shared Components] ---
const StatusBadge = ({ status }) => {
  const styles = {
    Live: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Draft: 'bg-gray-100 text-gray-600 border-gray-200',
    Pending: 'bg-blue-100 text-blue-700 border-blue-200',
    Failed: 'bg-red-100 text-red-700 border-red-200',
  };
  const icons = {
    Live: <CheckCircle className="w-3 h-3 mr-1" />,
    Draft: <Clock className="w-3 h-3 mr-1" />,
    Pending: <RefreshCw className="w-3 h-3 mr-1 animate-spin" />,
    Failed: <XCircle className="w-3 h-3 mr-1" />,
  };
  return (
    <span className={`flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const ModalWrapper = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-50 bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4">
    <div className="bg-white border border-gray-200 rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <h2 className="text-xl font-extrabold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200">
        {children}
      </div>
    </div>
  </div>
);

// --- [Feature Modals] ---
const CreateProjectModal = ({ onClose, onCreate }) => {
  const [projectName, setProjectName] = useState('');
  const [template, setTemplate] = useState('blank');
  const [subTemplate, setSubTemplate] = useState(null);

  const handleTemplateChange = (type) => {
    setTemplate(type);
    if (type === 'blank') setSubTemplate(null);
    else if (type === 'landing') setSubTemplate('landing-saas');
    else if (type === 'portfolio') setSubTemplate('portfolio-dev');
  };

  return (
    <ModalWrapper title="새 프로젝트 생성" onClose={onClose}>
      <div className="space-y-8">
        {/* 프로젝트 이름 입력 영역 추가 */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">프로젝트 이름</label>
          <input 
            type="text" 
            value={projectName} 
            onChange={e => setProjectName(e.target.value)} 
            placeholder="예: my-awesome-project"
            className="w-full bg-white border border-gray-300 rounded-lg py-2.5 px-4 text-sm text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* 메인 템플릿 선택 영역 */}
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-3">템플릿 선택 <span className="text-gray-400 font-medium text-xs ml-1">(기본: 빈 프로젝트)</span></label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            
            {/* 빈 프로젝트 */}
            <div onClick={() => handleTemplateChange('blank')} className={`group relative rounded-xl border cursor-pointer transition-all overflow-hidden flex flex-col bg-white ${template === 'blank' ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`}>
              {template === 'blank' && <div className="absolute top-2 right-2 z-10 bg-indigo-500 rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>}
              <div className="aspect-[16/10] bg-gray-50 flex items-center justify-center border-b border-gray-100 relative overflow-hidden">
                <div className="w-16 h-10 border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-white group-hover:scale-105 transition-transform duration-300">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-sm">빈 프로젝트</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium leading-tight">처음부터 완전히 새로운 구조로 시작합니다.</p>
              </div>
            </div>

            {/* 랜딩 페이지 */}
            <div onClick={() => handleTemplateChange('landing')} className={`group relative rounded-xl border cursor-pointer transition-all overflow-hidden flex flex-col bg-white ${template === 'landing' ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`}>
              {template === 'landing' && <div className="absolute top-2 right-2 z-10 bg-indigo-500 rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>}
              <div className="aspect-[16/10] bg-white flex flex-col border-b border-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-3 bg-gray-100 border-b border-gray-200 flex items-center px-1.5 gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div><div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-1.5 p-2 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-14 h-2 bg-gray-800 rounded-full"></div>
                  <div className="w-20 h-1 bg-gray-400 rounded-full"></div>
                  <div className="w-10 h-3 bg-indigo-500 rounded-full mt-1"></div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-sm">랜딩 페이지</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium leading-tight">회사나 서비스를 소개하는 단일 페이지 템플릿입니다.</p>
              </div>
            </div>

            {/* 포트폴리오 */}
            <div onClick={() => handleTemplateChange('portfolio')} className={`group relative rounded-xl border cursor-pointer transition-all overflow-hidden flex flex-col bg-white ${template === 'portfolio' ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`}>
              {template === 'portfolio' && <div className="absolute top-2 right-2 z-10 bg-indigo-500 rounded-full p-0.5"><CheckCircle2 className="w-4 h-4 text-white" /></div>}
              <div className="aspect-[16/10] bg-gray-50 flex border-b border-gray-100 overflow-hidden relative">
                <div className="w-1/4 bg-gray-200 border-r border-gray-300 p-1 flex flex-col items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-400 mt-1"></div>
                  <div className="w-5 h-0.5 bg-gray-400 rounded-full mt-1"></div>
                  <div className="w-4 h-0.5 bg-gray-400 rounded-full"></div>
                </div>
                <div className="w-3/4 p-2 flex flex-col gap-1.5 justify-center group-hover:scale-105 transition-transform duration-300 origin-left">
                  <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                  <div className="grid grid-cols-2 gap-1 w-full h-10">
                    <div className="bg-gray-300 rounded-sm"></div><div className="bg-gray-300 rounded-sm"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-gray-900 text-sm">포트폴리오</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium leading-tight">개인 이력과 프로젝트를 돋보이게 하는 템플릿입니다.</p>
              </div>
            </div>

          </div>

          {/* 서브 템플릿: 랜딩 페이지 */}
          {template === 'landing' && (
            <div className="pt-6 mt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">세부 랜딩 테마</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* SaaS 프로덕트 */}
                <div onClick={() => setSubTemplate('landing-saas')} className={`group relative p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${subTemplate === 'landing-saas' ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
                  {subTemplate === 'landing-saas' && <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /></div>}
                  <div className="w-24 aspect-video bg-slate-900 rounded-lg overflow-hidden flex flex-col border border-slate-700 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <div className="h-2 bg-slate-800 flex items-center px-1 gap-0.5">
                      <div className="w-1 h-1 rounded-full bg-rose-500"></div><div className="w-1 h-1 rounded-full bg-amber-500"></div><div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-1">
                      <div className="w-14 h-1.5 bg-white rounded-full mb-1"></div>
                      <div className="w-10 h-0.5 bg-slate-400 rounded-full mb-1.5"></div>
                      <div className="w-6 h-2 bg-indigo-500 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center"><MonitorPlay className="w-3.5 h-3.5 mr-1 text-indigo-600" /> SaaS 프로덕트</h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">소프트웨어/앱 중심 모던 다크 테마</p>
                  </div>
                </div>

                {/* 로컬 비즈니스 */}
                <div onClick={() => setSubTemplate('landing-local')} className={`group relative p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${subTemplate === 'landing-local' ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
                  {subTemplate === 'landing-local' && <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /></div>}
                  <div className="w-24 aspect-video bg-orange-50 rounded-lg overflow-hidden flex flex-col border border-orange-100 shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                    <div className="h-5 bg-orange-200 w-full relative">
                      <div className="absolute -bottom-2 left-1.5 w-5 h-5 bg-white rounded-full border border-orange-100"></div>
                    </div>
                    <div className="flex-1 p-1 pl-8 flex flex-col justify-center gap-0.5">
                      <div className="w-10 h-1 bg-orange-900 rounded-full"></div>
                      <div className="w-6 h-0.5 bg-orange-400 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center"><Store className="w-3.5 h-3.5 mr-1 text-orange-500" /> 로컬 비즈니스</h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">카페, 식당용 이미지 위주의 테마</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 서브 템플릿: 포트폴리오 */}
          {template === 'portfolio' && (
            <div className="pt-6 mt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">세부 포트폴리오 테마</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 개발자 이력서 */}
                <div onClick={() => setSubTemplate('portfolio-dev')} className={`group relative p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${subTemplate === 'portfolio-dev' ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
                  {subTemplate === 'portfolio-dev' && <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /></div>}
                  <div className="w-24 aspect-video bg-slate-50 rounded-lg overflow-hidden flex flex-col border border-slate-200 shadow-inner shrink-0 p-1.5 group-hover:scale-105 transition-transform">
                    <div className="flex items-center gap-1.5 mb-1.5">
                       <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                       <div className="w-10 h-1 bg-slate-400 rounded-full"></div>
                    </div>
                    <div className="w-full h-5 bg-emerald-50 border border-emerald-100 rounded flex items-center justify-center">
                       <div className="w-4/5 h-2/3 bg-emerald-200 rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center"><Briefcase className="w-3.5 h-3.5 mr-1 text-emerald-600" /> 개발자 이력서</h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">잔디 그래프와 프로젝트 위주 테마</p>
                  </div>
                </div>

                {/* 크리에이티브 디자이너 */}
                <div onClick={() => setSubTemplate('portfolio-design')} className={`group relative p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-4 ${subTemplate === 'portfolio-design' ? 'border-indigo-500 bg-indigo-50 shadow-sm ring-1 ring-indigo-500' : 'border-gray-200 hover:border-indigo-300 bg-white'}`}>
                  {subTemplate === 'portfolio-design' && <div className="absolute top-2 right-2"><CheckCircle2 className="w-4 h-4 text-indigo-600" /></div>}
                  <div className="w-24 aspect-video bg-white rounded-lg overflow-hidden flex gap-1 border border-gray-200 shadow-inner shrink-0 p-1 group-hover:scale-105 transition-transform">
                    <div className="w-1/2 h-full bg-rose-100 rounded"></div>
                    <div className="w-1/2 flex flex-col gap-1">
                      <div className="h-1/2 bg-amber-100 rounded"></div>
                      <div className="h-1/2 bg-blue-100 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm flex items-center"><Feather className="w-3.5 h-3.5 mr-1 text-rose-500" /> 크리에이티브</h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium">작품 갤러리와 여백 중심의 테마</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          <p className="text-xs text-indigo-600/80 mt-6 font-bold bg-indigo-50 p-3 rounded-lg border border-indigo-100 flex items-center">
            <Sparkles className="w-4 h-4 mr-1.5" /> 
            디자인 완성도 및 기능 추가는 생성 후 AI 에이전트와 대화하며 자유롭게 수정할 수 있습니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold transition-colors">취소</button>
          <button onClick={() => {
            if(!projectName.trim()) { alert('프로젝트 이름을 입력해주세요.'); return; }
            onCreate(projectName);
          }} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
            {template === 'blank' ? '빈 프로젝트 생성' : '템플릿으로 생성'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

const ImportRepoModal = ({ onClose, onImport }) => {
  return (
    <ModalWrapper title="GitHub 저장소 불러오기" onClose={onClose}>
      <div className="space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
          <input type="text" placeholder="저장소 검색..." className="w-full bg-gray-50 border border-gray-300 rounded-lg py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
          {MOCK_REPOS.map((repo, idx) => (
            <div key={idx} className="flex justify-between items-center p-3 rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 transition-colors cursor-pointer" onClick={() => onImport(repo.name.split('/')[1])}>
              <div className="flex items-center">
                <Globe className="w-5 h-5 mr-3 text-gray-600" />
                <span className="font-bold text-gray-900">{repo.name}</span>
              </div>
              <span className="text-xs font-medium text-gray-500">{repo.updated}</span>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

const ZipUploadModal = ({ onClose, onUpload }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = () => {
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 2000);
  };

  return (
    <ModalWrapper title="ZIP 파일 업로드" onClose={onClose}>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 transition-all">
        {!analyzing && !done && (
          <>
            <Upload className="w-10 h-10 text-gray-400 mb-4" />
            <p className="text-sm font-bold text-gray-700 mb-1">클릭하거나 ZIP 파일을 드래그하여 업로드</p>
            <p className="text-xs text-gray-500 mb-6">React, HTML/CSS/JS 프로젝트 지원</p>
            <button onClick={handleUpload} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm">파일 선택</button>
          </>
        )}
        {analyzing && (
          <div className="flex flex-col items-center py-6">
            <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mb-4" />
            <p className="text-sm font-bold text-gray-900">프로젝트 구조를 분석 중입니다...</p>
            <p className="text-xs text-gray-500 mt-2">package.json 및 빌드 스크립트 확인 중</p>
          </div>
        )}
        {done && (
          <div className="flex flex-col items-center py-6">
            <CheckCircle className="w-10 h-10 text-emerald-500 mb-4" />
            <p className="text-sm font-bold text-gray-900">분석 완료!</p>
            <p className="text-xs text-gray-500 mt-2 mb-6">미리보기를 실행할 준비가 되었습니다.</p>
            <button onClick={() => onUpload('uploaded-project-src')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm">워크스페이스 열기</button>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

// --- [Views] ---

// 0. 로그인 화면
const LoginView = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="font-extrabold text-white text-3xl leading-none">S</span>
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">SYS.AI</h2>
        <p className="mt-2 text-center text-sm text-gray-600 font-medium">대화만으로 웹서비스를 만들고 배포하는 플랫폼</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          <div className="space-y-6">
            <button onClick={onLogin} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 transition-all active:scale-[0.98]">
              <Globe className="w-5 h-5 mr-2" /> Continue with GitHub
            </button>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
                <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500 font-medium">요청 권한</span></div>
              </div>
              <ul className="mt-4 text-xs text-gray-500 font-medium space-y-2 text-center">
                <li className="flex justify-center items-center"><Check className="w-3 h-3 text-emerald-500 mr-1"/> 저장소 읽기/쓰기 및 워크플로우 실행</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 1. 홈 화면
const HomeView = ({ projects, onSelectProject, onAddProject }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showZip, setShowZip] = useState(false);

  const handleAddNew = (projectName) => {
    onAddProject(projectName);
    setShowCreate(false);
    setShowImport(false);
    setShowZip(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Projects</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">프로젝트를 선택하여 AI 에이전트와 작업을 시작하세요.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowZip(true)} className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
            <Upload className="w-4 h-4 mr-2" /> ZIP 업로드
          </button>
          <button onClick={() => setShowImport(true)} className="flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-bold transition-colors shadow-sm">
            <Globe className="w-4 h-4 mr-2" /> 저장소 연결
          </button>
          <button onClick={() => setShowCreate(true)} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> 새 프로젝트
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => (
          <div key={proj.id} onClick={() => onSelectProject(proj)} className="group bg-white border border-gray-200 hover:border-indigo-300 rounded-xl p-6 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors">{proj.name}</h3>
              <StatusBadge status={proj.status} />
            </div>
            <div className="space-y-3">
              {proj.status === 'Live' ? (
                <a href={proj.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="flex items-center text-sm font-medium text-emerald-600 hover:text-indigo-600 truncate">
                  <Globe className="w-4 h-4 mr-2 flex-shrink-0" /> <span className="truncate">{proj.url}</span>
                </a>
              ) : (
                <div className="flex items-center text-sm text-gray-400 h-5"><span className="truncate">배포되지 않음</span></div>
              )}
              <div className="flex justify-between items-center text-xs font-bold text-gray-500 pt-3 border-t border-gray-100">
                <div className="flex items-center"><Globe className="w-3.5 h-3.5 mr-1.5" />{proj.updated}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreate && <CreateProjectModal onClose={() => setShowCreate(false)} onCreate={handleAddNew} />}
      {showImport && <ImportRepoModal onClose={() => setShowImport(false)} onImport={handleAddNew} />}
      {showZip && <ZipUploadModal onClose={() => setShowZip(false)} onUpload={handleAddNew} />}
    </div>
  );
};

// 2. 프로젝트 개요 화면
const OverviewView = ({ project, onBack, onOpenWorkspace, onDeleteProject }) => {
  return (
    <div className="max-w-5xl mx-auto p-8 mt-4 flex flex-col">
      <button onClick={onBack} className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors font-bold w-fit">
        <ChevronLeft className="w-4 h-4 mr-1" /> 프로젝트 목록으로 돌아가기
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-8 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{project.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <StatusBadge status={project.status} />
              <span className="text-gray-500 font-bold border-l border-gray-300 pl-3">
                Version: <span className="font-mono text-gray-700">{project.version}</span>
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={onOpenWorkspace} className="flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm">
              <Play className="w-4 h-4 mr-2 fill-current" /> Open AI Agent
            </button>
          </div>
        </div>

        {project.status === 'Live' ? (
          <>
            <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-200 mb-8">
              <Globe className="w-5 h-5 text-indigo-500 mr-3" />
              <a href={project.url} target="_blank" rel="noreferrer" className="text-gray-900 hover:text-indigo-600 font-bold truncate flex-1">{project.url}</a>
              <button className="p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded mr-2" title="Copy URL"><Copy className="w-4 h-4" /></button>
              <a href={project.url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-600 bg-white border border-gray-200 rounded"><ExternalLink className="w-4 h-4" /></a>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-extrabold text-gray-900 mb-4 flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-500" /> 최근 반영 이력
                </h3>
                <div className="space-y-4">
                  {project.commits.map((commit, idx) => (
                    <div key={idx} className="flex justify-between items-start pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm text-gray-800 font-bold">{commit.msg}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500 font-mono font-bold bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">{commit.hash}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-gray-500 whitespace-nowrap ml-4">{commit.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm flex flex-col justify-center items-center text-center">
                {project.analytics ? (
                  <>
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-extrabold text-gray-900 mb-1">GA4 연동 완료</h3>
                    <p className="text-xs font-medium text-gray-500 mb-4">정상적으로 트래픽을 수집 중입니다.</p>
                    <div className="flex gap-4 text-left w-full max-w-xs p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1"><p className="text-[10px] font-bold text-gray-400 uppercase">Today Users</p><p className="font-mono text-gray-900 font-extrabold text-lg">1,284</p></div>
                      <div className="flex-1"><p className="text-[10px] font-bold text-gray-400 uppercase">Avg. Time</p><p className="font-mono text-gray-900 font-extrabold text-lg">1m 12s</p></div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-3">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-extrabold text-gray-900 mb-1">외부 분석 도구 미연동</h3>
                    <p className="text-xs font-medium text-gray-500">AI Agent에게 'GA4 연결해줘' 라고 요청해보세요.</p>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-gray-50 rounded-xl border border-gray-100 mb-8">
            <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 border border-indigo-100">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">아직 배포되지 않은 프로젝트입니다</h3>
            <p className="text-sm text-gray-500 mb-6">Open AI Agent 버튼을 눌러 작업을 시작하고 배포해보세요.</p>
          </div>
        )}
      </div>

      <div className="border border-red-200 bg-red-50 rounded-xl p-6 mb-8 w-full">
        <h3 className="text-sm font-extrabold text-red-800 mb-1">Danger Zone</h3>
        <p className="text-xs font-medium text-red-600/90 mb-4">프로젝트 목록에서만 삭제되며, 실제 GitHub 레포는 삭제되지 않습니다.</p>
        <button onClick={() => onDeleteProject(project.id)} className="flex items-center px-4 py-2 bg-white hover:bg-red-100 text-red-700 rounded-lg text-sm font-bold transition-colors border border-red-200 shadow-sm">
          <Trash2 className="w-4 h-4 mr-2" />
          워크스페이스에서 제거
        </button>
      </div>
    </div>
  );
};

// 3. 워크스페이스 (AI 대화 + Preview + Pipeline)
const WorkspaceView = ({ project, onBack, onUpdateProject }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', type: 'normal', text: `안녕하세요! **${project.name}** 워크스페이스입니다.\n\n아래의 [추천 프롬프트] 버튼을 클릭하면 실제 화면이 어떻게 수정되고 배포되는지 바로 확인하실 수 있습니다.` }
  ]);
  const [input, setInput] = useState('');
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('preview'); // 'preview' | 'diff' | 'pipeline'
  const [showTutorial, setShowTutorial] = useState(true); 
  
  const [previewState, setPreviewState] = useState(0); 
  const [buildLogs, setBuildLogs] = useState([]);
  const [deployStep, setDeployStep] = useState(0); 
  const [targetDomain, setTargetDomain] = useState('');

  const chatEndRef = useRef(null);
  const logsEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { logsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [buildLogs]);

  const handleSend = (text = input) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: text }]);
    setInput('');

    setTimeout(() => {
      if (text.includes('정식 런칭') || text.includes('빨간색') || text.includes('수정')) {
        setPreviewState(1);
        setViewMode('diff'); 
        setMessages(prev => [...prev, { 
          role: 'ai', 
          type: 'commit_approval',
          text: "요청하신 대로 메인 텍스트를 'SYS.AI 정식 런칭'으로 변경하고 버튼을 빨간색으로 수정했습니다.\n\n[Diff] 탭에서 변경된 코드를 확인하신 후, 해당 작업 내용을 확정(Commit)하시려면 아래 승인 버튼을 눌러주세요." 
        }]);
      }
      else if (text.includes('배포') || text.includes('도메인') || text.includes('cafe.com')) {
        setTargetDomain('cafe.com');
        setMessages(prev => [...prev, { 
          role: 'ai', 
          type: 'approval_request',
          text: "도메인 'cafe.com'의 연결과 트래픽 분석 도구(GA4) 주입 준비를 마쳤습니다. \n\n아래의 파이프라인 승인 카드를 확인하고 배포를 실행해주세요." 
        }]);
      } 
      else {
        setMessages(prev => [...prev, { role: 'ai', type: 'normal', text: "네, 내용을 확인했습니다. 처리 중입니다." }]);
      }
    }, 1200);
  };

  const simulatePipeline = () => {
    setIsDeployModalOpen(false);
    setViewMode('pipeline');
    setDeployStep(1);
    setBuildLogs(['> SYS.AI CI/CD Pipeline Initialized...', '> Target version: v2 (e4f5g6h)']);

    const steps = [
      { step: 1, delay: 1000, log: '> Creating a new commit from preview branch... \n> Hash: e4f5g6h generated successfully.' },
      { step: 2, delay: 2500, log: '> Running build scripts (npm run build)... \n> ✓ Compiled successfully in 1.2s. \n> Running UI integration tests... ✓ Passed.' },
      { step: 3, delay: 4500, log: '> Executing static security analysis (SAST)... \n> No high-risk vulnerabilities found. \n> CWEs checking passed.' },
      { step: 4, delay: 6500, log: `> Deploying static assets to Edge Network... \n> Updating DNS records for ${targetDomain || 'cafe.kro.kr'}... \n> ✓ Deployment successful! Live URL: https://${targetDomain || 'cafe.kro.kr'}` }
    ];

    steps.forEach(({ step, delay, log }) => {
      setTimeout(() => {
        setDeployStep(step);
        setBuildLogs(prev => [...prev, log]);
        
        if(step === 4) {
          setTimeout(() => {
            onUpdateProject({
              ...project,
              status: 'Live',
              url: `https://${targetDomain || 'cafe.kro.kr'}`,
              analytics: !!targetDomain,
              version: 'v2',
              updated: 'Just now',
              commits: [
                { hash: 'e4f5g6h', msg: 'AI Agent 다중 작업 반영 및 자동 배포', time: 'Just now' },
                ...project.commits
              ]
            });

            setMessages(prev => [...prev, { 
              role: 'ai', type: 'normal',
              text: `🎉 배포가 성공적으로 완료되었습니다!\n\nURL: https://${targetDomain || 'cafe.kro.kr'}\n\n도메인 접속 및 GA4 분석 연동이 완료되었습니다.\n상단 메뉴의 '나가기'를 눌러 개요화면에서 결과를 확인해보세요.` 
            }]);
          }, 1000);
        }
      }, delay);
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden relative">
      
      {/* 튜토리얼 레이어 (원래의 반투명 오버레이 방식으로 복구) */}
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setShowTutorial(false)}>
          <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm"></div>
          
          <div className="relative flex-1 flex flex-col p-6 pointer-events-none">
            <div className="border-4 border-dashed border-indigo-400 rounded-2xl flex-1 flex flex-col items-center justify-center text-indigo-100 p-8 text-center bg-indigo-900/20 animate-in zoom-in duration-300">
              <Layout className="w-16 h-16 mb-4 text-indigo-300" />
              <h3 className="text-2xl font-extrabold text-white mb-3">미리보기 & 파이프라인 영역</h3>
              <p className="text-lg font-medium">빌드된 결과물(Preview)을 실시간으로 확인하고,<br/>코드 변경점(Diff)과 배포 진행 상태(Pipeline)를 시각적으로 추적합니다.</p>
            </div>
          </div>

          <div className="relative w-96 flex flex-col p-6 pointer-events-none">
            <div className="border-4 border-dashed border-emerald-400 rounded-2xl flex-1 flex flex-col items-center justify-center text-emerald-100 p-6 text-center mb-6 bg-emerald-900/20 animate-in zoom-in duration-300 delay-75">
              <MessageSquare className="w-12 h-12 mb-4 text-emerald-300" />
              <h3 className="text-xl font-extrabold text-white mb-3">AI 에이전트 대화창</h3>
              <p className="font-medium">개발 지식이 없어도 자연어로<br/>수정, 기능 추가, 배포를 지시할 수 있습니다.</p>
            </div>
            <div className="h-40 border-4 border-dashed border-amber-400 rounded-2xl flex flex-col items-center justify-center text-amber-100 p-4 text-center bg-amber-900/20 animate-in zoom-in duration-300 delay-150">
              <h3 className="text-lg font-extrabold text-white mb-2">자연어 입력 & 트리거</h3>
              <p className="text-sm font-medium">프롬프트를 직접 입력하거나<br/>추천 버튼을 클릭해 복합 작업을 수행하세요.</p>
            </div>
          </div>

          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-lg cursor-pointer bg-white/20 px-6 py-3 rounded-full hover:bg-white/30 transition shadow-xl border border-white/30 pointer-events-auto flex items-center animate-in slide-in-from-top-4 duration-300">
            <CheckCircle className="w-5 h-5 mr-2" /> 시작하기 (화면 닫기)
          </div>
        </div>
      )}

      {/* 왼쪽 영역 */}
      <div className="flex-1 flex flex-col border-r border-gray-200 bg-gray-100 relative">
        <div className="h-14 border-b border-gray-200 flex justify-between items-center px-4 bg-white shadow-sm z-10 relative">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 font-bold flex items-center text-sm">
              <ChevronLeft className="w-4 h-4 mr-1" /> 나가기
            </button>
            <div className="h-6 w-px bg-gray-200 mx-1"></div>
            <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200 relative">
              <button onClick={() => setViewMode('preview')} className={`px-3 py-1 text-xs font-bold rounded-md flex items-center transition-colors ${viewMode === 'preview' ? 'bg-white text-indigo-700 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
                <Layout className="w-3.5 h-3.5 mr-1.5" /> Preview
              </button>
              <button onClick={() => setViewMode('diff')} className={`px-3 py-1 text-xs font-bold rounded-md flex items-center transition-colors ${viewMode === 'diff' ? 'bg-white text-indigo-700 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
                <Code className="w-3.5 h-3.5 mr-1.5" /> Code (Diff)
              </button>
              <button onClick={() => setViewMode('pipeline')} className={`px-3 py-1 text-xs font-bold rounded-md flex items-center transition-colors ${viewMode === 'pipeline' ? 'bg-white text-indigo-700 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-800'}`}>
                <Terminal className="w-3.5 h-3.5 mr-1.5" /> Pipeline
              </button>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
            preview branch
          </span>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden relative flex">
          {viewMode === 'preview' && (
            <div className="w-full h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all">
              <div className="h-10 border-b border-gray-200 bg-gray-50 flex items-center px-4">
                <div className="flex-1 bg-white border border-gray-200 rounded px-3 py-1 text-xs text-gray-500 flex items-center shadow-sm font-medium">
                  <Globe className="w-3 h-3 mr-2 text-gray-400" /> sys-ai-preview-env.local
                </div>
              </div>
              <div className="flex-1 p-10 flex flex-col items-center justify-center text-gray-900 bg-white">
                <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-center">
                  {previewState === 0 ? '비즈니스를 위한 완벽한 공간' : 'SYS.AI 정식 런칭'}
                </h1>
                <p className="text-gray-500 mb-8 text-center max-w-md leading-relaxed font-medium">
                  자연어로 요청한 수정사항이 실시간으로 여기에 반영됩니다.
                </p>
                <button className={`px-8 py-3 text-white rounded-full font-bold shadow-md transition-colors ${previewState === 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-red-600 hover:bg-red-700'}`}>
                  자세히 알아보기
                </button>
              </div>
            </div>
          )}

          {viewMode === 'diff' && (
            <div className="w-full h-full rounded-xl bg-white border border-gray-200 flex overflow-hidden font-mono text-sm shadow-sm">
              <div className="flex-1 border-r border-gray-200 flex flex-col">
                <div className="bg-gray-50 py-2 px-4 text-xs font-bold text-gray-500 border-b border-gray-200">Original (main)</div>
                <div className="p-4 text-gray-700 bg-red-50/50 h-full overflow-y-auto">
                  <span className="text-gray-400 line-through">{'<h1 className="text-4xl font-extrabold">비즈니스를 위한 완벽한 공간</h1>'}</span><br/>
                  <span className="text-gray-400 line-through mt-2 block">{'<button className="bg-indigo-600 text-white">자세히 알아보기</button>'}</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="bg-gray-50 py-2 px-4 text-xs font-bold text-gray-500 border-b border-gray-200">Modified (preview)</div>
                <div className="p-4 text-emerald-700 bg-emerald-50/50 h-full overflow-y-auto">
                  {previewState === 1 && (
                    <>
                      <span>{'<h1 className="text-4xl font-extrabold text-gray-900">SYS.AI 정식 런칭</h1>'}</span><br/>
                      <span className="mt-2 block">{'<button className="bg-red-600 text-white rounded-full">자세히 알아보기</button>'}</span>
                      <br/><br/>
                    </>
                  )}
                  {targetDomain && (
                    <>
                      <span className="text-gray-400 text-xs block">/* AI Agent 자동 주입 - GA4 설정 */</span>
                      <span>{'<script async src="https://www.googletagmanager.com/gtag/js?id=G-SYS123"></script>'}</span>
                    </>
                  )}
                  {previewState === 0 && !targetDomain && (
                    <span className="text-gray-400 text-xs font-medium">수정사항이 반영되면 이곳에 실시간으로 코드가 표시됩니다.</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {viewMode === 'pipeline' && (
            <div className="w-full h-full flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
              <h2 className="text-lg font-extrabold text-gray-900 mb-6">배포 파이프라인 진행 상태</h2>
              
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl p-6 relative mb-6">
                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-200 -z-0"></div>
                {['Commit', 'Build & Test', 'Security Scan', 'Deployed'].map((label, i) => {
                  const stepNum = i + 1;
                  const Icon = stepNum === 1 ? GitCommit : stepNum === 2 ? RefreshCw : stepNum === 3 ? ShieldCheck : Server;
                  const isActive = deployStep >= stepNum;
                  const isDone = deployStep > stepNum || (stepNum === 4 && deployStep === 4);
                  const isSpin = stepNum === 2 && deployStep === 2;
                  
                  return (
                    <div key={label} className="flex flex-col items-center z-10 bg-gray-50 px-2">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-colors ${isActive ? (stepNum===4 ? 'bg-emerald-100 border-emerald-600 text-emerald-600' : 'bg-indigo-100 border-indigo-600 text-indigo-600') : 'bg-white border-gray-300 text-gray-400'}`}>
                        {isDone && stepNum===4 ? <Check className="w-5 h-5" /> : <Icon className={`w-5 h-5 ${isSpin ? 'animate-spin' : ''}`} />}
                      </div>
                      <span className={`text-xs font-bold ${isActive ? (stepNum===4 ? 'text-emerald-700' : 'text-indigo-700') : 'text-gray-500'}`}>{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-y-auto shadow-inner border border-gray-800">
                {buildLogs.map((log, idx) => (
                  <div key={idx} className="text-emerald-400 whitespace-pre-wrap leading-relaxed mb-1">{log}</div>
                ))}
                {deployStep < 4 && deployStep > 0 && <div className="text-gray-500 animate-pulse mt-2">_</div>}
                {deployStep === 0 && <div className="text-gray-500">대기 중... 배포를 실행하면 진행 로그가 표시됩니다.</div>}
                <div ref={logsEndRef} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 오른쪽 영역 */}
      <div className="w-96 flex flex-col bg-white shadow-2xl z-10 border-l border-gray-200 relative">
        <div className="h-14 border-b border-gray-200 flex justify-between items-center px-5 bg-gray-50">
          <h2 className="text-sm font-extrabold text-gray-900 flex items-center">
            <span className="w-2 h-2 rounded-full bg-indigo-600 mr-2 animate-pulse"></span> SYS.AI Agent
          </h2>
          <button onClick={() => setShowTutorial(true)} className="flex items-center text-xs font-bold text-gray-500 hover:text-indigo-600 transition-colors bg-white border border-gray-200 px-2 py-1 rounded-full shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 mr-1" /> 도움말 보기
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 text-sm whitespace-pre-wrap leading-relaxed shadow-sm border ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none border-indigo-600 font-medium' : 'bg-white text-gray-800 border-gray-200 rounded-bl-none font-medium'}`}>
                {msg.text}
              </div>

              {msg.type === 'approval_request' && (
                <div className="mt-3 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center text-xs text-indigo-700 font-extrabold mb-3 pb-2 border-b border-gray-200">
                    <CheckCircle className="w-4 h-4 mr-1.5" /> 자동화 파이프라인 승인 대기
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-sm text-gray-700 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>코드 반영 확인 <Check className="w-3 h-3 text-emerald-600 ml-auto" />
                    </div>
                    <div className="flex flex-col gap-1 border border-gray-200 bg-white rounded-lg p-3 shadow-sm">
                      <div className="flex items-center text-sm text-gray-700 font-bold mb-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>실제 배포 실행 (대기)</div>
                      <div className="flex items-center text-sm text-gray-700 font-bold mb-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>도메인 연결 ({targetDomain})</div>
                      <div className="flex items-center text-sm text-gray-700 font-bold"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></div>GA4 도구 연동</div>
                    </div>
                  </div>
                  <button onClick={() => setIsDeployModalOpen(true)} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm flex items-center justify-center">
                    배포 승인 및 실행 <ArrowRight className="w-4 h-4 ml-1.5" />
                  </button>
                </div>
              )}

              {/* 코드 수정 후 커밋 승인 추가된 부분 */}
              {msg.type === 'commit_approval' && (
                <div className="mt-3 w-full bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center text-xs text-indigo-700 font-extrabold mb-3 pb-2 border-b border-gray-200">
                    <Code className="w-4 h-4 mr-1.5" /> 코드 변경사항 커밋 대기
                  </div>
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-sm text-gray-700 font-bold">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></div>UI 텍스트 및 스타일 수정 반영
                    </div>
                    <div className="text-xs text-gray-500 ml-3.5 font-medium">미리보기 및 Diff 탭에서 확인 완료 후 승인해주세요.</div>
                  </div>
                  <button onClick={() => {
                    setMessages(prev => [...prev, { role: 'ai', type: 'normal', text: "✅ 변경사항이 성공적으로 커밋되었습니다. (Hash: f7g8h9i)\n\n이제 '배포'를 요청하여 실제 서비스에 반영할 수 있습니다." }]);
                  }} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold shadow-sm flex items-center justify-center">
                    변경사항 커밋 승인
                  </button>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50 relative">
          <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hide pb-1">
            <button onClick={() => handleSend("메인 텍스트를 'SYS.AI 정식 런칭'으로 바꾸고 버튼을 빨간색으로 변경해줘.")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-50 shadow-sm transition-colors">
              🎨 UI 수정 요청
            </button>
            <button onClick={() => handleSend("작업한 내용을 cafe.com 도메인으로 배포하고 GA4 분석 도구도 연결해줘.")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-indigo-200 text-indigo-700 rounded-full text-xs font-bold hover:bg-indigo-50 shadow-sm transition-colors">
              🚀 도메인 & 배포 요청
            </button>
          </div>

          <div className="relative flex items-end">
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="직접 입력하거나 위 추천 버튼을 누르세요"
              className="w-full bg-white border border-gray-300 rounded-xl py-3 pl-4 pr-12 text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none min-h-[52px] shadow-sm" rows={1}
            />
            <button onClick={() => handleSend()} disabled={!input.trim()} className="absolute right-2 bottom-2 p-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-lg transition-colors shadow-sm">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 배포 승인 모달 */}
      {isDeployModalOpen && (
        <ModalWrapper title="최종 배포 승인" onClose={() => setIsDeployModalOpen(false)}>
          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-500 font-bold">배포할 버전</span>
                <span className="text-gray-900 font-mono font-bold bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm">v2 (Latest)</span>
              </div>
              <div className="flex justify-between items-center mb-3 text-sm">
                <span className="text-gray-500 font-bold">대상 저장소</span>
                <span className="text-gray-900 font-bold flex items-center"><Globe className="w-4 h-4 mr-1 text-gray-500" />{project.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-bold">적용 도메인</span>
                <span className="text-emerald-700 font-extrabold ml-4 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-100 shadow-sm">https://{targetDomain || 'cafe.kro.kr'} (예정)</span>
              </div>
            </div>
            <div>
              <span className="block text-xs font-extrabold text-gray-500 mb-2 uppercase tracking-wider">적용될 작업 요약</span>
              <ul className="text-sm text-gray-700 font-bold space-y-1.5 ml-5 list-disc marker:text-indigo-400">
                <li>UI 텍스트 및 버튼 색상 변경 내용 포함</li>
                <li>커스텀 도메인 DNS 자동 연결 처리</li>
                <li>구글 애널리틱스(GA4) 스크립트 주입</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setIsDeployModalOpen(false)} className="flex-1 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-bold transition-colors border border-gray-300 shadow-sm">취소</button>
            <button onClick={simulatePipeline} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-colors shadow-sm">승인 및 파이프라인 실행</button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

// --- [Main App] ---
export default function App() {
  const [currentView, setCurrentView] = useState('LOGIN'); 
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = projects.find(p => p.id === activeProjectId);

  const handleAddProject = (name) => {
    const newProject = {
      id: Date.now(),
      name: name,
      status: 'Draft',
      url: '',
      updated: 'Just now',
      version: 'v1',
      commits: [{ hash: 'a1b2c3d', msg: 'Init', time: 'Just now'}],
      analytics: false
    };
    setProjects([newProject, ...projects]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(p => p.id !== id));
    setActiveProjectId(null);
    setCurrentView('HOME');
  };

  if (currentView === 'LOGIN') {
    return <LoginView onLogin={() => setCurrentView('HOME')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
      {currentView !== 'WORKSPACE' && (
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setActiveProjectId(null); setCurrentView('HOME'); }}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
              <span className="font-extrabold text-white text-lg leading-none">S</span>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-gray-900">SYS.AI</span>
          </div>
          <div className="flex items-center gap-5 text-sm font-bold text-gray-500">
            <button className="hover:text-gray-900 transition-colors">Documentation</button>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <button className="flex items-center hover:text-gray-900 transition-colors bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200 shadow-sm">
                <Globe className="w-4 h-4 mr-2" /> Dev User
              </button>
              <button onClick={() => { setActiveProjectId(null); setCurrentView('LOGIN'); }} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors" title="Logout">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1">
        {currentView === 'HOME' && (
          <HomeView 
            projects={projects} 
            onAddProject={handleAddProject} 
            onSelectProject={p => { setActiveProjectId(p.id); setCurrentView('OVERVIEW'); }} 
          />
        )}
        {currentView === 'OVERVIEW' && activeProject && (
          <OverviewView 
            project={activeProject} 
            onBack={() => { setActiveProjectId(null); setCurrentView('HOME'); }} 
            onOpenWorkspace={() => setCurrentView('WORKSPACE')} 
            onDeleteProject={handleDeleteProject}
          />
        )}
        {currentView === 'WORKSPACE' && activeProject && (
          <WorkspaceView 
            project={activeProject} 
            onBack={() => setCurrentView('OVERVIEW')} 
            onUpdateProject={handleUpdateProject}
          />
        )}
      </main>
    </div>
  );
}