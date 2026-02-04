import React, { useState, useCallback, useEffect } from 'react';
import { LearnerProfile, TrainingPathway, StoredUser } from './types';
import { ACADEMIC_BACKGROUNDS, LEARNING_PACE_OPTIONS } from './constants';
import { generatePathway, generateExamPlan } from './services/geminiService';
import { savePathway } from './services/authService';
import { getPublicPathway } from './services/pathwayService';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Step1 from './components/form/Step1';
import Step2 from './components/form/Step2';
import Spinner from './components/common/Spinner';
import PathwayDisplay from './components/PathwayDisplay';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import AboutPage from './components/about/AboutPage';
import ChatBox from './components/chat/ChatBox';
import ExamPrepHub from './components/exam/ExamPrepHub';
import Dashboard from './components/dashboard/Dashboard';
import { useLanguage } from './contexts/LanguageContext';
import PrivacyPolicyPage from './components/about/PrivacyPolicyPage';
import ContactPage from './components/about/ContactPage';
import { languageOptions } from './translations';

type View = 'login' | 'register' | 'forgotPassword' | 'dashboard' | 'form' | 'loading' | 'pathway' | 'examHub' | 'about' | 'privacy' | 'contact' | 'publicPathway';

const initialLearnerProfile: LearnerProfile = {
  academicBackground: ACADEMIC_BACKGROUNDS[0],
  priorSkills: [],
  preferredLocation: '',
  learningPace: LEARNING_PACE_OPTIONS[0],
  careerAspiration: '',
  preferredLanguage: 'en',
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('loading');
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [activePathway, setActivePathway] = useState<TrainingPathway | null>(null);
  const [publicPathway, setPublicPathway] = useState<TrainingPathway | null>(null);
  const [step, setStep] = useState<number>(1);
  const [learnerProfile, setLearnerProfile] = useState<LearnerProfile>(initialLearnerProfile);
  const [error, setError] = useState<string | null>(null);
  const { t, setLanguage, language } = useLanguage();

  useEffect(() => {
    // Sync learner profile language with global language
    if (learnerProfile.preferredLanguage !== language) {
        setLearnerProfile(prev => ({ ...prev, preferredLanguage: language }));
    }
  }, [language, learnerProfile.preferredLanguage]);

  useEffect(() => {
    const initializeApp = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const pathwayId = urlParams.get('pathway');

        if (pathwayId) {
            try {
                const pathway = await getPublicPathway(pathwayId);
                if (pathway) {
                    setPublicPathway(pathway);
                    setLearnerProfile({ // Create a generic profile for display
                        academicBackground: 'N/A',
                        priorSkills: [],
                        preferredLocation: 'N/A',
                        learningPace: 'N/A',
                        careerAspiration: pathway.pathwayTitle.replace(/Personalized Pathway to become a |Your Pathway to becoming a /i, ''),
                        preferredLanguage: 'en',
                    });
                    setView('publicPathway');
                    return; // Exit early
                } else {
                    alert('Shared pathway not found.');
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch (error) {
                console.error('Error fetching public pathway:', error);
                alert('Could not load the shared pathway.');
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        }

        const storedUser = localStorage.getItem('skillNavigatorUser');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);

                if (typeof user !== 'object' || user === null || !user.email) {
                    throw new Error('Invalid user session data.');
                }

                const sanitizedUser: StoredUser = {
                    name: user.name || '',
                    email: user.email,
                    password: user.password,
                    savedPathways: Array.isArray(user.savedPathways) ? user.savedPathways : [],
                };

                setCurrentUser(sanitizedUser);
                setView(sanitizedUser.savedPathways.length > 0 ? 'dashboard' : 'form');
            } catch (error) {
                console.error("Failed to initialize app from stored user, clearing session:", error);
                localStorage.removeItem('skillNavigatorUser');
                setView('login');
            }
        } else {
            setView('login');
        }
    };

    initializeApp();
  }, []);


  const handleLogin = (user: StoredUser) => {
    localStorage.setItem('skillNavigatorUser', JSON.stringify(user));
    setCurrentUser(user);
    setView(user.savedPathways && user.savedPathways.length > 0 ? 'dashboard' : 'form');
  };

  const handleRegister = () => {
     setView('login');
  };

  const handleLogout = () => {
    localStorage.removeItem('skillNavigatorUser');
    setCurrentUser(null);
    setActivePathway(null);
    setView('login');
  };

  const handleNavigateHome = () => {
    if (currentUser) {
        setView('dashboard');
        setActivePathway(null);
        setStep(1);
        setLearnerProfile(initialLearnerProfile);
    } else {
        setView('login');
    }
  };

  const handleNavigateToPrivacy = () => {
    setView('privacy');
  };

  const handleNavigateToContact = () => {
    setView('contact');
  };

  const handleReturnToDashboard = () => {
    setView('dashboard');
  };

  const handleProfileChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'preferredLanguage') {
        setLanguage(value); // Update global language
    }
    
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setLearnerProfile(prev => {
            const currentSkills = prev.priorSkills;
            if (checked) {
                return { ...prev, priorSkills: [...currentSkills, value] };
            } else {
                return { ...prev, priorSkills: currentSkills.filter(skill => skill !== value) };
            }
        });
    } else {
        setLearnerProfile(prev => ({ ...prev, [name]: value }));
    }
  }, [setLanguage]);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev + 1);

  const handleSubmit = async () => {
    setView('loading');
    setError(null);
    setActivePathway(null);
    try {
      const result = await generatePathway(learnerProfile);
      const newPathway: TrainingPathway = {
          ...result,
          id: `path_${Date.now()}`,
          createdAt: new Date().toISOString(),
      };
      setActivePathway(newPathway);
      setView('pathway');
    } catch (err) {
      setError(t('app.error.pathwayGeneration'));
      setView('form'); // Go back to form on error
      console.error(err);
    }
  };
  
  const handleStartNewPathway = () => {
    setStep(1);
    setActivePathway(null);
    setError(null);
    setPublicPathway(null);
    setLearnerProfile(initialLearnerProfile);
    window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
    if (currentUser) {
        setView('form');
    } else {
        setView('login');
    }
  };

  const handleEditPathwayInputs = () => {
    setStep(1);
    setActivePathway(null);
    setError(null);
    setPublicPathway(null);
    window.history.replaceState({}, document.title, window.location.pathname);
    setView('form');
  };

  const handleSavePathway = async () => {
    if (!activePathway || !currentUser) return;

    try {
        const updatedUser = await savePathway(currentUser.email, activePathway);
        setCurrentUser(updatedUser);
        localStorage.setItem('skillNavigatorUser', JSON.stringify(updatedUser));
        alert(t('app.alert.pathwaySaved'));
    } catch (error) {
        console.error('Failed to save pathway:', error);
        alert(t( (error as Error).message) || t('app.alert.pathwaySaveFailed') );
    }
  };
  
  const handleViewPathway = (pathway: TrainingPathway) => {
    const representativeProfile: LearnerProfile = {
      careerAspiration: pathway.pathwayTitle.replace(/Personalized Pathway to become a |Your Pathway to becoming a /i, ''),
      preferredLanguage: 'en',
      academicBackground: 'N/A',
      priorSkills: [],
      preferredLocation: 'N/A',
      learningPace: 'N/A',
    };
    setLearnerProfile(representativeProfile);
    setActivePathway(pathway);
    setView('pathway');
  };
  
  const renderAppContent = () => {
    if (view === 'loading') {
      return (
        <div className="text-center p-12 bg-white rounded-lg shadow-xl">
          <Spinner />
          <h2 className="text-2xl font-semibold text-slate-700 mt-6">{t('app.loading.title')}</h2>
          <p className="text-slate-500 mt-2">{t('app.loading.subtitle')}</p>
        </div>
      );
    }

    if (view === 'publicPathway') {
      if (!publicPathway) {
        return <Spinner />; 
      }
      return <PathwayDisplay pathway={publicPathway} learnerProfile={learnerProfile} isPublicView={true} />;
    }
    if (view === 'about') {
      return <AboutPage onBack={handleNavigateHome} />;
    }
    
    if (view === 'privacy') {
      return <PrivacyPolicyPage onBack={handleNavigateHome} />;
    }
    
    if (view === 'contact') {
      return <ContactPage onBack={handleNavigateHome} />;
    }

    if (!currentUser) {
      switch (view) {
        case 'register':
          return <RegistrationPage onRegister={handleRegister} onNavigateToLogin={() => setView('login')} />;
        case 'forgotPassword':
          return <ForgotPasswordPage onNavigateToLogin={() => setView('login')} />;
        case 'login':
        default:
          return <LoginPage onLogin={handleLogin} onNavigateToRegister={() => setView('register')} onNavigateToForgotPassword={() => setView('forgotPassword')} />;
      }
    }

    switch (view) {
      case 'pathway':
        if (!activePathway) {
          return <Dashboard user={currentUser} onGenerateNew={handleStartNewPathway} onViewPathway={handleViewPathway} />;
        }
        const isSaved = currentUser.savedPathways?.some(p => p.id === activePathway.id) ?? false;
        return (
          <PathwayDisplay
            pathway={activePathway}
            learnerProfile={learnerProfile}
            onStartExamPrep={() => setView('examHub')}
            onSave={handleSavePathway}
            isSaved={isSaved}
            isPublicView={false}
            onBackToForm={handleEditPathwayInputs}
          />
        );

      case 'examHub':
        if (!activePathway) {
            return <Dashboard user={currentUser} onGenerateNew={handleStartNewPathway} onViewPathway={handleViewPathway} />;
        }
        return <ExamPrepHub learnerProfile={learnerProfile} onBackToPathway={() => setView('pathway')} />;

      case 'form':
        return (
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                <div className="p-8">
                {error && (
                     <div className="text-center p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
                        <p>{error}</p>
                    </div>
                )}
                <h2 className="text-center text-3xl font-bold text-slate-800">{t('form.title')}</h2>
                <p className="text-center text-slate-500 mt-2">{t('form.subtitle')}</p>
                <div className="flex justify-center my-6">
                    <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
                    <p className={`ml-2 font-semibold ${step === 1 ? 'text-indigo-600' : 'text-slate-500'}`}>{t('form.step1.title')}</p>
                    <div className="w-16 h-1 bg-slate-200 mx-4"></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
                    <p className={`ml-2 font-semibold ${step === 2 ? 'text-indigo-600' : 'text-slate-500'}`}>{t('form.step2.title')}</p>
                    </div>
                </div>
                {step === 1 && <Step1 data={learnerProfile} handleChange={handleProfileChange} nextStep={nextStep} />}
                {step === 2 && <Step2 data={learnerProfile} handleChange={handleProfileChange} prevStep={prevStep} submit={handleSubmit} />}
                </div>
            </div>
        );

      case 'dashboard':
      default:
        return <Dashboard user={currentUser} onGenerateNew={handleStartNewPathway} onViewPathway={handleViewPathway} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header 
        user={currentUser} 
        onLogout={handleLogout} 
        onNavigateHome={handleNavigateHome}
        onNavigateToAbout={() => setView('about')}
      />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {renderAppContent()}
      </main>
      <Footer 
        onNavigateToAbout={() => setView('about')} 
        onNavigateToPrivacy={handleNavigateToPrivacy}
        onNavigateToContact={handleNavigateToContact}
      />
      {currentUser && <ChatBox />}
    </div>
  );
};

export default App;