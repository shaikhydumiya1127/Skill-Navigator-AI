export const translate = (lang: string, key: string, replacements?: Record<string, string>): string => {
    // A helper to safely access nested properties.
    const getNestedValue = (obj: any, path: string): string | undefined => {
        const value = path.split('.').reduce((acc, part) => acc && acc[part], obj);
        return typeof value === 'string' ? value : undefined;
    };

    const langKey = lang as keyof typeof translations;
    const langTranslations = translations[langKey] || translations.en;
    
    let translatedString = getNestedValue(langTranslations, key);

    // Fallback to English if not found in the current language
    if (translatedString === undefined && lang !== 'en') {
        translatedString = getNestedValue(translations.en, key);
    }

    // If still not found, return the key itself
    if (translatedString === undefined) {
        console.warn(`Translation key not found: ${key}`);
        return key;
    }

    // Apply replacements
    if (replacements) {
        Object.entries(replacements).forEach(([placeholder, value]) => {
            translatedString = translatedString!.replace(`{${placeholder}}`, value);
        });
    }

    return translatedString;
};


export const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिन्दी' },
    { value: 'bn', label: 'বাংলা' },
    { value: 'ta', label: 'தமிழ்' },
    { value: 'te', label: 'తెలుగు' },
    { value: 'mr', label: 'मराठी' },
];

export const translations = {
  en: {
    common: {
      back: 'Back',
      next: 'Next',
      backAria: 'Go back'
    },
    header: {
      about: 'About',
      welcome: 'Welcome',
      logout: 'Logout',
    },
    footer: {
      about: 'About Us',
      privacy: 'Privacy Policy',
      contact: 'Contact',
      copyright: '© {year} National Council for Vocational Education and Training (NCVET). All rights reserved.',
      poweredBy: 'Powered by AI for a skilled India.'
    },
    login: {
      welcomeBack: "Welcome Back!",
      signInToContinue: "Sign in to continue your journey.",
      emailAddress: "Email Address",
      password: "Password",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      signingIn: "Signing In...",
      orContinueWith: "Or continue with",
      signInWith: "Sign in with",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      error: {
        invalidCredentials: "Invalid email or password. Please try again.",
        unknown: "An unknown error occurred. Please try again later."
      }
    },
    register: {
        title: "Create Your Account",
        subtitle: "Start your personalized skill journey today.",
        name: {
            label: "Full Name",
            placeholder: "e.g., Priya Sharma"
        },
        email: {
            label: "Email Address"
        },
        password: {
            label: "Password"
        },
        createAccount: "Create Account",
        creatingAccount: "Creating Account...",
        alreadyHaveAccount: "Already have an account?",
        signIn: "Sign in",
        backToLogin: "Back to Login",
        backToLoginAria: "Go back to login",
        error: {
            allFieldsRequired: "All fields are required.",
            unknown: "An unknown error occurred during registration.",
            passwordTooShort: 'Password must be at least 6 characters long.',
            emailExists: 'An account with this email address already exists.',
            passwordInUse: 'This password is already in use by another account. Please choose a different one.'
        },
        alert: {
            success: "Registration successful! Please log in."
        }
    },
    forgotPassword: {
        title: "Reset Your Password",
        subtitle: "Enter your email and we'll send you a link to get back into your account.",
        email: {
            label: "Email Address"
        },
        sendResetLink: "Send Reset Link",
        rememberPassword: "Remember your password?",
        signIn: "Sign in",
        backToLogin: "Back to Login",
        backToLoginAria: "Go back to login",
        submitted: {
            title: "Check Your Email",
            subtitle: "If an account with {email} exists, we've sent instructions to reset your password.",
            backToSignIn: "Back to Sign In"
        }
    },
    dashboard: {
        welcome: "Welcome back",
        subtitle: "You can view your saved skill pathways below or generate a new one.",
        generateNew: "Generate New Skill Pathway",
        savedOn: "Saved on",
        viewPathway: "View Pathway",
        noSavedPathways: {
            title: "No saved pathways",
            subtitle: "Get started by generating a new skill pathway."
        }
    },
    form: {
        title: "Discover Your Skill Pathway",
        subtitle: "Complete the steps below to get your personalized career plan.",
        step1: {
            title: "Your Background",
            academicBackground: {
                label: "Highest Academic Background"
            },
            priorSkills: {
                label: "Prior Skills or Experience (Select all that apply)",
                helper: "Select any skills you already have. This will help us tailor your pathway."
            }
        },
        step2: {
            title: "Your Goals",
            careerAspiration: {
                label: "Career Aspiration / Goal",
                placeholder: "e.g., Solar Panel Technician, AI/ML Specialist"
            },
            preferredLocation: {
                label: "Preferred Work Location (City/State)",
                placeholder: "e.g., Bangalore, Karnataka"
            },
            learningPace: {
                label: "Preferred Learning Pace"
            },
            preferredLanguage: {
                label: "Preferred Language for Pathway"
            },
            generatePathway: "Generate Pathway"
        }
    },
    pathwayGraph: {
        title: "Your Learning Roadmap"
    },
    pathwayDisplay: {
        share: 'Share Pathway',
        linkCopied: 'Link Copied!',
        shareFailed: 'Sharing Failed',
        timelineTitle: 'Your Learning Timeline',
        duration: 'Duration:',
        nsqfLevel: 'NSQF Level:',
        watchSuggested: 'Watch Suggested Tutorial',
        findTutorials: 'Find Tutorials on YouTube',
        searchPrepared: "We've prepared a search for relevant videos for you.",
        backToForm: 'Back to Form',
        savePathway: 'Save Pathway',
        prepareForExams: 'Prepare for Exams',
        provideFeedback: 'Provide Feedback',
        downloadPathway: 'Download Pathway'
    },
    marketInsights: {
        title: 'Career Market Insights',
        jobDemand: 'Job Demand',
        salary: 'Salary Expectation (Entry-Level)',
        hiringCompanies: 'Top Hiring Companies',
        keySkills: 'Key Skills in Demand'
    },
    careerGuidance: {
        title: 'Personalized Career Guidance',
        companiesAndSectors: 'Top Companies & Sectors',
        topPick: 'TOP PICK',
        recommendedCompany: 'Your Recommended Company',
        roadmap: 'Your Roadmap to Get Hired at {companyName}',
        skillsToHighlight: 'Skills to Highlight',
        interviewPrep: 'Interview Preparation',
        networkingTips: 'Networking Tips'
    },
    chat: {
        title: 'AI Skill Assistant',
        initialMessage: 'Hello! How can I help you with your career and skill journey today?',
        unavailable: 'Sorry, the chat assistant is currently unavailable.',
        errorMessage: 'Sorry, I encountered an error. Please try again.',
        placeholder: 'Ask a question...'
    },
    examHub: {
        title: 'Exam Preparation Hub',
        downloadPlan: 'Download Plan',
        backToPathway: 'Back to Pathway',
        generating: 'Generating Your Study Plan...',
        showPriorityOnly: 'Show Priority Only',
        noPriorityItems: 'You have not marked any items as high priority.',
        error: {
            title: 'Error',
            failed: 'Failed to generate study plan. Please try again.',
            selectExam: 'Please select an exam to get a study plan.'
        },
        plan: {
            title: 'Study Plan for {examName}',
            roadmap: 'Study Roadmap',
            books: 'Recommended Books',
            courses: 'Online Courses',
            questions: 'Practice Questions',
            question: 'Question {index}',
            answer: 'Answer:'
        },
        form: {
            title: 'Select an Exam',
            subtitle: 'Choose a competitive exam to generate a personalized study plan.',
            label: 'Select Competitive Exam',
            button: 'Generate Study Plan'
        }
    },
    feedbackModal: {
        title: 'Provide Feedback',
        close: 'Close modal',
        subtitle: 'How was this pathway recommendation? Your insights help us improve our AI.',
        placeholder: "e.g., The steps were very clear, but I'd like to see more resources for beginners...",
        cancel: 'Cancel',
        submit: 'Submit Feedback',
        submitted: {
            title: 'Thank You!',
            message: 'Your feedback has been received. We appreciate you helping us improve.'
        }
    },
    app: {
        loading: {
            title: "Generating Your Personalized Pathway...",
            subtitle: "Our AI is analyzing your profile to create the perfect skill journey for you."
        },
        error: {
            pathwayGeneration: "Failed to generate pathway. Please ensure your API key is correctly configured and try again.",
            userNotFound: "User not found."
        },
        alert: {
            pathwaySaved: "Pathway saved successfully!",
            pathwaySaveFailed: "Could not save the pathway. Please try again."
        }
    },
    about: {
        title: "About NCVET Skill Navigator AI",
        subtitle: "Your personalized guide to a successful vocational career in India.",
        mission: {
            title: "Our Mission",
            description: "Our mission is to empower every learner in India with a clear, personalized, and adaptive pathway to acquire vocational skills that are aligned with their aspirations and the real-time demands of the labor market. We aim to bridge the gap between education and employment, creating a skilled workforce for a thriving India."
        },
        whoWeAre: {
            title: "Who We Are",
            description1: "The Skill Navigator AI is an initiative by the <strong>National Council for Vocational Education and Training (NCVET)</strong>, the national regulator for vocational education in India. We are committed to establishing and maintaining high standards for skill development across the country.",
            description2: "This platform integrates directly with the National Skills Qualifications Framework (NSQF) to ensure every recommendation is credible, recognized, and valuable for your career."
        },
        technology: {
            title: "The Technology",
            description1: "This platform is powered by state-of-the-art Artificial Intelligence. We utilize advanced AI models to analyze your unique profile, including your academic background, existing skills, and career goals.",
            description2: "Our AI recommendation engine then maps your profile against a vast database of NCVET-approved qualifications and real-time labor market data to generate a customized learning journey just for you."
        }
    },
    features: {
        title: "Why Choose Skill Navigator AI?",
        subtitle: "A comprehensive platform designed to empower your career journey with cutting-edge technology and government-recognized standards.",
        aiPowered: {
            title: "AI-Powered Recommendations",
            description: "Our smart AI understands your background and goals to create a unique learning path just for you, based on an AI/ML-driven learner profiling and recommendation engine."
        },
        govRecognized: {
            title: "Government Recognized Pathways",
            description: "All our recommended courses are aligned with national standards (NCVET & NSQF) for qualifications that matter, with direct integration with training programs."
        },
        clearDashboard: {
            title: "Clear Career Dashboard",
            description: "Track your progress and explore career options on a simple, easy-to-use career guidance dashboard for learners, trainers, and policymakers."
        },
        jobInsights: {
            title: "Real-Time Job Insights",
            description: "We connect your skills to what's in demand with real-time mapping to labour market intelligence, ensuring industry alignment."
        },
        multilingual: {
            title: "Learning in Your Language",
            description: "Access guidance in multiple languages. Our platform is a multilingual, inclusive, and accessible solution for diverse learner groups."
        },
        reliablePlatform: {
            title: "Reliable & Fast Platform",
            description: "Our robust, scalable architecture ensures a smooth and dependable experience, ready to support millions of learners across India."
        },
        dataSafe: {
            title: "Your Data is Safe",
            description: "We follow strict privacy and security norms to protect your personal information at all times, ensuring full compliance."
        }
    },
    privacyPolicy: {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: August 1, 2024",
        introduction: {
            title: "Introduction",
            content: "<p>Welcome to NCVET Skill Navigator AI. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this policy carefully.</p>"
        },
        informationWeCollect: {
            title: "Information We Collect",
            content: "<p>We may collect information about you in a variety of ways. The information we may collect on the Service includes:</p><ul><li><strong>Personal Data:</strong> Personally identifiable information, such as your name and email address, that you voluntarily give to us when you register with the Service.</li><li><strong>Learner Profile Data:</strong> Information you provide to generate skill pathways, such as your academic background, prior skills, career aspirations, and learning preferences.</li><li><strong>Usage Data:</strong> We may automatically collect information about your access to and use of the Service, but this data is anonymized and used for service improvement only.</li></ul>"
        },
        howWeUseInfo: {
            title: "How We Use Your Information",
            content: "<p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Service to:</p><ul><li>Create and manage your account.</li><li>Generate personalized vocational training pathways.</li><li>Improve the efficiency and operation of the Service.</li><li>Monitor and analyze usage and trends to improve your experience.</li><li>Respond to user inquiries and offer support.</li></ul>"
        },
        dataSharing: {
            title: "Data Sharing and Disclosure",
            content: "<p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our application, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety. Anonymized, aggregate data may be used for research and policy-making purposes.</p>"
        },
        dataSecurity: {
            title: "Data Security",
            content: "<p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>"
        },
        yourRights: {
            title: "Your Rights",
            content: "<p>You have the right to access, update, or delete the information we have on you. As this is a demonstration application using browser storage, you can clear your data by clearing your browser's local storage for this site. In a full-scale application, you would have account management tools to exercise these rights directly.</p>"
        },
        changes: {
            title: "Changes to This Privacy Policy",
            content: "<p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>"
        },
        contact: {
            title: "Contact Us",
            content: "<p>If you have any questions about this Privacy Policy, please contact the NCVET through its official government channels. This application is a prototype and does not have a dedicated support team.</p>"
        }
    },
    contactPage: {
        title: "Contact Us",
        subtitle: "We're here to help. Reach out to us through the following channels.",
        addressTitle: "Our Address",
        address: "National Council for Vocational Education and Training (NCVET)<br>Kaushal Bhawan, B-2, Pusa Road, Karol Bagh,<br>New Delhi – 110005, India",
        phoneTitle: "Phone Number",
        phone: "+91 8328605892",
        emailTitle: "Email Address",
        email: "shaikhydumiya1127@gmail.com",
        note: "For inquiries regarding this application, please use the contact details provided above."
    },
    constants: {
        academic_backgrounds: {
            'Below 8th Standard': 'Below 8th Standard',
            '8th Pass': '8th Pass',
            '10th Pass': '10th Pass',
            '12th Pass / Intermediate': '12th Pass / Intermediate',
            'ITI Certificate': 'ITI Certificate',
            'Polytechnic Diploma': 'Polytechnic Diploma',
            'Vocational Training Certificate': 'Vocational Training Certificate',
            'Undergraduate (Pursuing)': 'Undergraduate (Pursuing)',
            'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'Graduate Degree',
            'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'Postgraduate Degree',
            'Doctorate (PhD)': 'Doctorate (PhD)'
        },
        learning_pace_options: {
            'Full-time': 'Full-time',
            'Part-time': 'Part-time',
            'Weekend only': 'Weekend only',
            'Self-paced (Online)': 'Self-paced (Online)',
            'Flexible (Hybrid)': 'Flexible (Hybrid)'
        },
        common_skills: {
            'Programming (Java, Python, C, etc.)': 'Programming (Java, Python, C, etc.)',
            'Web Development (HTML, CSS, PHP, JS)': 'Web Development (HTML, CSS, PHP, JS)',
            'Data Science / AI / ML': 'Data Science / AI / ML',
            'Database Management (SQL, MongoDB)': 'Database Management (SQL, MongoDB)',
            'Cloud Computing (AWS, IBM Watson, Azure)': 'Cloud Computing (AWS, IBM Watson, Azure)',
            'Automation (UiPath, RPA)': 'Automation (UiPath, RPA)',
            'Cybersecurity': 'Cybersecurity',
            'Mobile Development': 'Mobile Development',
            'UI/UX Design': 'UI/UX Design',
            'Graphic Design': 'Graphic Design',
            'Video Editing': 'Video Editing',
            'Problem-Solving': 'Problem-Solving',
            'Data Analysis': 'Data Analysis',
            'Critical Thinking': 'Critical Thinking',
            'Research & Development': 'Research & Development',
            'Project Management': 'Project Management',
            'Team Collaboration': 'Team Collaboration',
            'Leadership / Coordination': 'Leadership / Coordination',
            'Entrepreneurship / Business Planning': 'Entrepreneurship / Business Planning',
            'Marketing & Strategy': 'Marketing & Strategy',
            'Digital Marketing': 'Digital Marketing',
            'Sales': 'Sales',
            'Accounting': 'Accounting',
            'Customer Service': 'Customer Service',
            'Innovation & Idea Generation': 'Innovation & Idea Generation',
            'Content Writing / Presentation': 'Content Writing / Presentation',
            'Design Thinking': 'Design Thinking',
            'Public Speaking': 'Public Speaking',
            'Communication Skills': 'Communication Skills',
            'Time Management': 'Time Management',
            'Adaptability': 'Adaptability',
            'Decision Making': 'Decision Making',
            'Networking': 'Networking',
            'Spoken English': 'Spoken English',
            'IBM Watson': 'IBM Watson',
            'UiPath (RPA)': 'UiPath (RPA)',
            'Git/GitHub': 'Git/GitHub',
            'MS Office / Google Workspace': 'MS Office / Google Workspace',
            'Data Entry': 'Data Entry',
            'Electrical Wiring': 'Electrical Wiring',
            'Plumbing': 'Plumbing',
            'Welding': 'Welding',
            'Carpentry': 'Carpentry',
            'Automotive Repair': 'Automotive Repair',
            'Cooking & Baking': 'Cooking & Baking',
            'Healthcare Assistance': 'Healthcare Assistance',
            'Mechanical Drawing': 'Mechanical Drawing',
        },
        career_aspirations: {
            'Technologist / Engineer': 'Technologist / Engineer',
            'Data Analyst / AI Specialist': 'Data Analyst / AI Specialist',
            'Doctor / Medical Professional': 'Doctor / Medical Professional',
            'Government / Public Sector': 'Government / Public Sector',
            'Researcher / Scientist': 'Researcher / Scientist',
            'Innovator / Problem Solver': 'Innovator / Problem Solver',
            'Entrepreneur / Startup Founder': 'Entrepreneur / Startup Founder',
            'Business Leader / Manager': 'Business Leader / Manager',
            'Social Entrepreneur / Change Maker': 'Social Entrepreneur / Change Maker',
            'Educator / Mentor': 'Educator / Mentor',
            'Creative Designer / Innovator': 'Creative Designer / Innovator',
            'Global Professional / International Career': 'Global Professional / International Career',
            'Full Stack Developer': 'Full Stack Developer',
            'Cloud Computing Engineer': 'Cloud Computing Engineer',
            'Cybersecurity Analyst': 'Cybersecurity Analyst',
            'Digital Marketing Manager': 'Digital Marketing Manager',
            'Logistics and Supply Chain Manager': 'Logistics and Supply Chain Manager',
            'Solar Panel Technician': 'Solar Panel Technician',
            'EV Charging Station Technician': 'EV Charging Station Technician',
            'Organic Farming Specialist': 'Organic Farming Specialist',
            'Drone Operator': 'Drone Operator',
            '3D Printing Technician': '3D Printing Technician',
            'AR/VR Developer': 'AR/VR Developer',
            'Robotics Engineer': 'Robotics Engineer',
            'Certified Nursing Assistant (CNA)': 'Certified Nursing Assistant (CNA)',
            'Medical Lab Technician': 'Medical Lab Technician',
        },
        competitive_exams: {
            'GATE': 'GATE (Graduate Aptitude Test in Engineering)',
            'NEET_PG': 'NEET-PG (Post-Graduation)',
            'UPSC_CSE': 'UPSC Civil Services Exam',
            'CAT': 'CAT (Common Admission Test)',
            'SSC_CGL': 'SSC CGL (Combined Graduate Level)',
            'IBPS_PO': 'IBPS PO (Probationary Officer)',
            'UGC_NET': 'UGC NET (National Eligibility Test)',
            'JEE': 'JEE Main & Advanced'
        }
    }
  },
  hi: {
    common: {
      back: 'वापस',
      next: 'अगला',
      backAria: 'वापस जाएं'
    },
    header: {
      about: 'परिचय',
      welcome: 'स्वागत है',
      logout: 'लॉग आउट',
    },
    footer: {
      about: 'हमारे बारे में',
      privacy: 'गोपनीयता नीति',
      contact: 'संपर्क करें',
      copyright: '© {year} राष्ट्रीय व्यावसायिक शिक्षा और प्रशिक्षण परिषद (NCVET)। सर्वाधिकार सुरक्षित।',
      poweredBy: 'एक कुशल भारत के लिए एआई द्वारा संचालित।'
    },
    login: {
      welcomeBack: "वापसी पर स्वागत है!",
      signInToContinue: "अपनी यात्रा जारी रखने के लिए साइन इन करें।",
      emailAddress: "ईमेल पता",
      password: "पासवर्ड",
      forgotPassword: "पासवर्ड भूल गए?",
      signIn: "साइन इन करें",
      signingIn: "साइन इन हो रहा है...",
      noAccount: "कोई खाता नहीं है?",
      signUp: "साइन अप करें",
      error: {
        invalidCredentials: "अमान्य ईमेल या पासवर्ड। कृपया पुन: प्रयास करें।",
        unknown: "एक अज्ञात त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।"
      }
    },
    register: {
        title: "अपना खाता बनाएं",
        subtitle: "आज ही अपनी व्यक्तिगत कौशल यात्रा शुरू करें।",
        name: {
            label: "पूरा नाम",
            placeholder: "उदा., प्रिया शर्मा"
        },
        email: {
            label: "ईमेल पता"
        },
        password: {
            label: "पासवर्ड"
        },
        createAccount: "खाता बनाएं",
        creatingAccount: "खाता बनाया जा रहा है...",
        alreadyHaveAccount: "पहले से ही एक खाता है?",
        signIn: "साइन इन करें",
        backToLogin: "लॉगिन पर वापस जाएं",
        backToLoginAria: "लॉगिन पर वापस जाएं",
        error: {
            allFieldsRequired: "सभी फ़ील्ड आवश्यक हैं।",
            unknown: "पंजीकरण के दौरान एक अज्ञात त्रुटि हुई।",
            passwordTooShort: 'पासवर्ड कम से कम 6 वर्णों का होना चाहिए।',
            emailExists: 'इस ईमेल पते के साथ एक खाता पहले से मौजूद है।',
            passwordInUse: 'यह पासवर्ड पहले से ही किसी अन्य खाते द्वारा उपयोग में है। कृपया कोई दूसरा चुनें।'
        },
        alert: {
            success: "पंजीकरण सफल! कृपया लॉग इन करें।"
        }
    },
    forgotPassword: {
        title: "अपना पासवर्ड रीसेट करें",
        subtitle: "अपना ईमेल दर्ज करें और हम आपको आपके खाते में वापस आने के लिए एक लिंक भेजेंगे।",
        email: {
            label: "ईमेल पता"
        },
        sendResetLink: "रीसेट लिंक भेजें",
        rememberPassword: "अपना पासवर्ड याद है?",
        signIn: "साइन इन करें",
        backToLogin: "लॉगिन पर वापस जाएं",
        backToLoginAria: "लॉगिन पर वापस जाएं",
        submitted: {
            title: "अपना ईमेल जांचें",
            subtitle: "यदि {email} वाला कोई खाता मौजूद है, तो हमने आपका पासवर्ड रीसेट करने के निर्देश भेजे हैं।",
            backToSignIn: "साइन इन पर वापस जाएं"
        }
    },
    dashboard: {
        welcome: "वापसी पर स्वागत है",
        subtitle: "आप नीचे अपने सहेजे गए कौशल पथ देख सकते हैं या एक नया बना सकते हैं।",
        generateNew: "नया कौशल पथ बनाएं",
        savedOn: "सहेजा गया",
        viewPathway: "पथ देखें",
        noSavedPathways: {
            title: "कोई सहेजा गया पथ नहीं",
            subtitle: "एक नया कौशल पथ बनाकर आरंभ करें।"
        }
    },
    form: {
        title: "अपना कौशल पथ खोजें",
        subtitle: "अपनी व्यक्तिगत करियर योजना प्राप्त करने के लिए नीचे दिए गए चरणों को पूरा करें।",
        step1: {
            title: "आपकी पृष्ठभूमि",
            academicBackground: {
                label: "उच्चतम शैक्षणिक पृष्ठभूमि"
            },
            priorSkills: {
                label: "पूर्व कौशल या अनुभव (जो भी लागू हो उसे चुनें)",
                helper: "आपके पास पहले से मौजूद कोई भी कौशल चुनें। यह हमें आपके पथ को अनुकूलित करने में मदद करेगा।"
            }
        },
        step2: {
            title: "आपके लक्ष्य",
            careerAspiration: {
                label: "करियर आकांक्षा / लक्ष्य",
                placeholder: "उदा., सोलर पैनल तकनीशियन, एआई/एमएल विशेषज्ञ"
            },
            preferredLocation: {
                label: "पसंदीदा कार्य स्थान (शहर/राज्य)",
                placeholder: "उदा., बैंगलोर, कर्नाटक"
            },
            learningPace: {
                label: "पसंदीदा सीखने की गति"
            },
            preferredLanguage: {
                label: "पथ के लिए पसंदीदा भाषा"
            },
            generatePathway: "पथ बनाएं"
        }
    },
    pathwayGraph: {
        title: "आपका सीखने का रोडमैप"
    },
    pathwayDisplay: {
        share: 'पथ साझा करें',
        linkCopied: 'लिंक कॉपी किया गया!',
        shareFailed: 'साझा करने में विफल',
        timelineTitle: 'आपकी सीखने की समयरेखा',
        duration: 'अवधि:',
        nsqfLevel: 'NSQF स्तर:',
        watchSuggested: 'सुझाया गया ट्यूटोरियल देखें',
        findTutorials: 'YouTube पर ट्यूटोरियल खोजें',
        searchPrepared: "हमने आपके लिए प्रासंगिक वीडियो की खोज तैयार की है।",
        backToForm: 'फ़ॉर्म पर वापस जाएं',
        savePathway: 'पथ सहेजें',
        prepareForExams: 'परीक्षा की तैयारी करें',
        provideFeedback: 'प्रतिक्रिया दें',
        downloadPathway: 'पथ डाउनलोड करें'
    },
    marketInsights: {
        title: 'करियर बाजार अंतर्दृष्टि',
        jobDemand: 'नौकरी की मांग',
        salary: 'वेतन अपेक्षा (प्रवेश-स्तर)',
        hiringCompanies: 'शीर्ष भर्ती कंपनियां',
        keySkills: 'मांग में प्रमुख कौशल'
    },
    careerGuidance: {
        title: 'व्यक्तिगत करियर मार्गदर्शन',
        companiesAndSectors: 'शीर्ष कंपनियां और क्षेत्र',
        topPick: 'शीर्ष चयन',
        recommendedCompany: 'आपकी अनुशंसित कंपनी',
        roadmap: '{companyName} में नौकरी पाने के लिए आपका रोडमैप',
        skillsToHighlight: 'उजागर करने के लिए कौशल',
        interviewPrep: 'साक्षात्कार की तैयारी',
        networkingTips: 'नेटवर्किंग टिप्स'
    },
    chat: {
        title: 'एआई कौशल सहायक',
        initialMessage: 'नमस्ते! मैं आज आपके करियर और कौशल यात्रा में आपकी कैसे मदद कर सकता हूँ?',
        unavailable: 'क्षमा करें, चैट सहायक वर्तमान में अनुपलब्ध है।',
        errorMessage: 'क्षमा करें, मुझे एक त्रुटि का सामना करना पड़ा। कृपया पुन: प्रयास करें।',
        placeholder: 'एक प्रश्न पूछें...'
    },
    examHub: {
        title: 'परीक्षा तैयारी हब',
        downloadPlan: 'योजना डाउनलोड करें',
        backToPathway: 'पथ पर वापस जाएं',
        generating: 'आपकी अध्ययन योजना बना रहा है...',
        showPriorityOnly: 'केवल प्राथमिकता वाले दिखाएं',
        noPriorityItems: 'आपने किसी भी आइटम को उच्च प्राथमिकता के रूप में चिह्नित नहीं किया है।',
        error: {
            title: 'त्रुटि',
            failed: 'अध्ययन योजना बनाने में विफल। कृपया पुन: प्रयास करें।',
            selectExam: 'अध्ययन योजना प्राप्त करने के लिए कृपया एक परीक्षा चुनें।'
        },
        plan: {
            title: '{examName} के लिए अध्ययन योजना',
            roadmap: 'अध्ययन रोडमैप',
            books: 'अनुशंसित पुस्तकें',
            courses: 'ऑनलाइन पाठ्यक्रम',
            questions: 'अभ्यास प्रश्न',
            question: 'प्रश्न {index}',
            answer: 'उत्तर:'
        },
        form: {
            title: 'एक परीक्षा चुनें',
            subtitle: 'एक व्यक्तिगत अध्ययन योजना बनाने के लिए एक प्रतियोगी परीक्षा चुनें।',
            label: 'प्रतियोगी परीक्षा चुनें',
            button: 'अध्ययन योजना बनाएं'
        }
    },
    feedbackModal: {
        title: 'प्रतिक्रिया दें',
        close: 'मॉडल बंद करें',
        subtitle: 'यह पथ सिफारिश कैसी थी? आपकी अंतर्दृष्टि हमें हमारे एआई को बेहतर बनाने में मदद करती है।',
        placeholder: "उदा., चरण बहुत स्पष्ट थे, लेकिन मैं शुरुआती लोगों के लिए और अधिक संसाधन देखना चाहूंगा...",
        cancel: 'रद्द करें',
        submit: 'प्रतिक्रिया जमा करें',
        submitted: {
            title: 'धन्यवाद!',
            message: 'आपकी प्रतिक्रिया प्राप्त हो गई है। हमें बेहतर बनाने में मदद करने के लिए हम आपकी सराहना करते हैं।'
        }
    },
    app: {
        loading: {
            title: "आपका व्यक्तिगत पथ बनाया जा रहा है...",
            subtitle: "हमारा एआई आपके लिए सही कौशल यात्रा बनाने के लिए आपकी प्रोफ़ाइल का विश्लेषण कर रहा है।"
        },
        error: {
            pathwayGeneration: "पथ बनाने में विफल। कृपया सुनिश्चित करें कि आपकी API कुंजी सही ढंग से कॉन्फ़िगर की गई है और पुनः प्रयास करें।",
            userNotFound: "उपयोगकर्ता नहीं मिला।"
        },
        alert: {
            pathwaySaved: "पथ सफलतापूर्वक सहेजा गया!",
            pathwaySaveFailed: "पथ सहेज नहीं सका। कृपया पुन: प्रयास करें।"
        }
    },
    about: {
        title: "NCVET स्किल नेविगेटर एआई के बारे में",
        subtitle: "भारत में एक सफल व्यावसायिक करियर के लिए आपका व्यक्तिगत मार्गदर्शक।",
        mission: {
            title: "हमारा मिशन",
            description: "हमारा मिशन भारत में प्रत्येक शिक्षार्थी को उनकी आकांक्षाओं और श्रम बाजार की वास्तविक समय की मांगों के अनुरूप व्यावसायिक कौशल प्राप्त करने के लिए एक स्पष्ट, व्यक्तिगत और अनुकूली मार्ग के साथ सशक्त बनाना है। हमारा लक्ष्य शिक्षा और रोजगार के बीच की खाई को पाटना है, एक संपन्न भारत के लिए एक कुशल कार्यबल बनाना है।"
        },
        whoWeAre: {
            title: "हम कौन हैं",
            description1: "स्किल नेविगेटर एआई <strong>राष्ट्रीय व्यावसायिक शिक्षा और प्रशिक्षण परिषद (NCVET)</strong> द्वारा एक पहल है, जो भारत में व्यावसायिक शिक्षा के लिए राष्ट्रीय नियामक है। हम देश भर में कौशल विकास के लिए उच्च मानकों को स्थापित करने और बनाए रखने के लिए प्रतिबद्ध हैं।",
            description2: "यह प्लेटफ़ॉर्म राष्ट्रीय कौशल योग्यता फ्रेमवर्क (NSQF) के साथ सीधे एकीकृत होता है ताकि यह सुनिश्चित हो सके कि प्रत्येक सिफारिश विश्वसनीय, मान्यता प्राप्त और आपके करियर के लिए मूल्यवान है।"
        },
        technology: {
            title: "प्रौद्योगिकी",
            description1: "यह प्लेटफ़ॉर्म अत्याधुनिक आर्टिफिशियल इंटेलिजेंस द्वारा संचालित है। हम आपकी अनूठी प्रोफ़ाइल का विश्लेषण करने के लिए उन्नत एआई मॉडल का उपयोग करते हैं, जिसमें आपकी शैक्षणिक पृष्ठभूमि, मौजूदा कौशल और करियर लक्ष्य शामिल हैं।",
            description2: "हमारा एआई सिफारिश इंजन तब आपकी प्रोफ़ाइल को NCVET-अनुमोदित योग्यताओं और वास्तविक समय के श्रम बाजार डेटा के विशाल डेटाबेस के खिलाफ मैप करता है ताकि केवल आपके लिए एक अनुकूलित सीखने की यात्रा तैयार की जा सके।"
        }
    },
    features: {
        title: "स्किल नेविगेटर एआई क्यों चुनें?",
        subtitle: "अत्याधुनिक तकनीक और सरकार द्वारा मान्यता प्राप्त मानकों के साथ आपके करियर की यात्रा को सशक्त बनाने के लिए डिज़ाइन किया गया एक व्यापक मंच।",
        aiPowered: {
            title: "एआई-संचालित सिफारिशें",
            description: "हमारा स्मार्ट एआई आपकी पृष्ठभूमि और लक्ष्यों को समझता है ताकि केवल आपके लिए एक अनूठा सीखने का मार्ग बनाया जा सके, जो एआई/एमएल-संचालित शिक्षार्थी प्रोफाइलिंग और सिफारिश इंजन पर आधारित है।"
        },
        govRecognized: {
            title: "सरकार द्वारा मान्यता प्राप्त पथ",
            description: "हमारे सभी अनुशंसित पाठ्यक्रम राष्ट्रीय मानकों (NCVET & NSQF) के साथ संरेखित हैं, जो उन योग्यताओं के लिए हैं जो प्रशिक्षण कार्यक्रमों के साथ सीधे एकीकरण के साथ मायने रखती हैं।"
        },
        clearDashboard: {
            title: "स्पष्ट करियर डैशबोर्ड",
            description: "शिक्षार्थियों, प्रशिक्षकों और नीति निर्माताओं के लिए एक सरल, उपयोग में आसान करियर मार्गदर्शन डैशबोर्ड पर अपनी प्रगति को ट्रैक करें और करियर विकल्पों का पता लगाएं।"
        },
        jobInsights: {
            title: "वास्तविक समय की नौकरी की जानकारी",
            description: "हम आपके कौशल को श्रम बाजार की खुफिया जानकारी के लिए वास्तविक समय की मैपिंग के साथ मांग में क्या है, से जोड़ते हैं, जिससे उद्योग संरेखण सुनिश्चित होता है।"
        },
        multilingual: {
            title: "आपकी भाषा में सीखना",
            description: "कई भाषाओं में मार्गदर्शन प्राप्त करें। हमारा प्लेटफ़ॉर्म विविध शिक्षार्थी समूहों के लिए एक बहुभाषी, समावेशी और सुलभ समाधान है।"
        },
        reliablePlatform: {
            title: "विश्वसनीय और तेज़ प्लेटफ़ॉर्म",
            description: "हमारा मजबूत, स्केलेबल आर्किटेक्चर एक सहज और भरोसेमंद अनुभव सुनिश्चित करता है, जो पूरे भारत में लाखों शिक्षार्थियों का समर्थन करने के लिए तैयार है।"
        },
        dataSafe: {
            title: "आपका डेटा सुरक्षित है",
            description: "हम आपकी व्यक्तिगत जानकारी की हर समय सुरक्षा के लिए सख्त गोपनीयता और सुरक्षा मानदंडों का पालन करते हैं, जिससे पूर्ण अनुपालन सुनिश्चित होता है।"
        }
    },
    privacyPolicy: {
        title: "गोपनीयता नीति",
        lastUpdated: "अंतिम अपडेट: 1 अगस्त, 2024",
        introduction: {
            title: "परिचय",
            content: "<p>NCVET स्किल नेविगेटर एआई में आपका स्वागत है। हम आपकी गोपनीयता की रक्षा करने के लिए प्रतिबद्ध हैं। यह गोपनीयता नीति बताती है कि जब आप हमारी एप्लिकेशन का उपयोग करते हैं तो हम आपकी जानकारी कैसे एकत्र करते हैं, उपयोग करते हैं, प्रकट करते हैं और सुरक्षित रखते हैं। कृपया इस नीति को ध्यान से पढ़ें।</p>"
        },
        informationWeCollect: {
            title: "हम जो जानकारी एकत्र करते हैं",
            content: "<p>हम आपके बारे में विभिन्न तरीकों से जानकारी एकत्र कर सकते हैं। सेवा पर हम जो जानकारी एकत्र कर सकते हैं उसमें शामिल हैं:</p><ul><li><strong>व्यक्तिगत डेटा:</strong> व्यक्तिगत रूप से पहचानी जाने वाली जानकारी, जैसे आपका नाम और ईमेल पता, जो आप सेवा के साथ पंजीकरण करते समय स्वेच्छा से हमें देते हैं।</li><li><strong>शिक्षार्थी प्रोफ़ाइल डेटा:</strong> कौशल पथ बनाने के लिए आपके द्वारा प्रदान की गई जानकारी, जैसे आपकी शैक्षणिक पृष्ठभूमि, पूर्व कौशल, करियर आकांक्षाएं और सीखने की प्राथमिकताएं।</li><li><strong>उपयोग डेटा:</strong> हम सेवा तक आपकी पहुंच और उपयोग के बारे में स्वचालित रूप से जानकारी एकत्र कर सकते हैं, लेकिन यह डेटा अज्ञात है और केवल सेवा सुधार के लिए उपयोग किया जाता है।</li></ul>"
        },
        howWeUseInfo: {
            title: "हम आपकी जानकारी का उपयोग कैसे करते हैं",
            content: "<p>आपके बारे में सटीक जानकारी होने से हमें आपको एक सहज, कुशल और अनुकूलित अनुभव प्रदान करने की अनुमति मिलती है। विशेष रूप से, हम सेवा के माध्यम से आपके बारे में एकत्र की गई जानकारी का उपयोग कर सकते हैं:</p><ul><li>आपका खाता बनाने और प्रबंधित करने के लिए।</li><li>व्यक्तिगत व्यावसायिक प्रशिक्षण पथ बनाने के लिए।</li><li>सेवा की दक्षता और संचालन में सुधार करने के लिए।</li><li>आपके अनुभव को बेहतर बनाने के लिए उपयोग और प्रवृत्तियों की निगरानी और विश्लेषण करने के लिए।</li><li>उपयोगकर्ता पूछताछ का जवाब देने और समर्थन प्रदान करने के लिए।</li></ul>"
        },
        dataSharing: {
            title: "डेटा साझाकरण और प्रकटीकरण",
            content: "<p>हम आपकी व्यक्तिगत रूप से पहचानी जाने वाली जानकारी को बाहरी पार्टियों को बेचते, व्यापार या अन्यथा हस्तांतरित नहीं करते हैं। इसमें वे विश्वसनीय तृतीय पक्ष शामिल नहीं हैं जो हमारी एप्लिकेशन के संचालन में हमारी सहायता करते हैं, जब तक कि वे पार्टियां इस जानकारी को गोपनीय रखने के लिए सहमत हों। हम आपकी जानकारी तब भी जारी कर सकते हैं जब हमें विश्वास हो कि रिलीज कानून का पालन करने, हमारी साइट नीतियों को लागू करने, या हमारे या दूसरों के अधिकारों, संपत्ति या सुरक्षा की रक्षा के लिए उपयुक्त है। अज्ञात, समग्र डेटा का उपयोग अनुसंधान और नीति-निर्माण उद्देश्यों के लिए किया जा सकता है।</p>"
        },
        dataSecurity: {
            title: "डेटा सुरक्षा",
            content: "<p>हम आपकी व्यक्तिगत जानकारी की सुरक्षा में मदद करने के लिए प्रशासनिक, तकनीकी और भौतिक सुरक्षा उपायों का उपयोग करते हैं। यद्यपि हमने आपके द्वारा हमें प्रदान की गई व्यक्तिगत जानकारी को सुरक्षित करने के लिए उचित कदम उठाए हैं, कृपया ध्यान रखें कि हमारे प्रयासों के बावजूद, कोई भी सुरक्षा उपाय पूर्ण या अभेद्य नहीं है, और डेटा ट्रांसमिशन की कोई भी विधि किसी भी अवरोधन या अन्य प्रकार के दुरुपयोग के खिलाफ गारंटी नहीं दी जा सकती है।</p>"
        },
        yourRights: {
            title: "आपके अधिकार",
            content: "<p>आपके पास हमारे पास मौजूद जानकारी तक पहुंचने, उसे अपडेट करने या हटाने का अधिकार है। चूंकि यह ब्राउज़र स्टोरेज का उपयोग करने वाला एक प्रदर्शन एप्लिकेशन है, इसलिए आप इस साइट के लिए अपने ब्राउज़र के स्थानीय स्टोरेज को साफ़ करके अपना डेटा साफ़ कर सकते हैं। एक पूर्ण-स्तरीय एप्लिकेशन में, आपके पास इन अधिकारों का सीधे उपयोग करने के लिए खाता प्रबंधन उपकरण होंगे।</p>"
        },
        changes: {
            title: "इस गोपनीयता नीति में परिवर्तन",
            content: "<p>हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। हम इस पृष्ठ पर नई गोपनीयता नीति पोस्ट करके आपको किसी भी परिवर्तन के बारे में सूचित करेंगे। आपको किसी भी परिवर्तन के लिए समय-समय पर इस गोपनीयता नीति की समीक्षा करने की सलाह दी जाती है।</p>"
        },
        contact: {
            title: "हमसे संपर्क करें",
            content: "<p>यदि इस गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया NCVET से उसके आधिकारिक सरकारी चैनलों के माध्यम से संपर्क करें। यह एप्लिकेशन एक प्रोटोटाइप है और इसकी कोई समर्पित सहायता टीम नहीं है।</p>"
        }
    },
     contactPage: {
        title: "हमसे संपर्क करें",
        subtitle: "हम सहायता के लिए यहां हैं। निम्नलिखित चैनलों के माध्यम से हमसे संपर्क करें।",
        addressTitle: "हमारा पता",
        address: "राष्ट्रीय व्यावसायिक शिक्षा और प्रशिक्षण परिषद (NCVET)<br>कौशल भवन, बी-2, पूसा रोड, करोल बाग,<br>नई दिल्ली – 110005, भारत",
        phoneTitle: "फ़ोन नंबर",
        phone: "+91 8328605892",
        emailTitle: "ईमेल पता",
        email: "shaikhydumiya1127@gmail.com",
        note: "इस एप्लिकेशन के संबंध में पूछताछ के लिए, कृपया ऊपर दिए गए संपर्क विवरण का उपयोग करें।"
    },
    constants: {
        academic_backgrounds: {
            'Below 8th Standard': '8वीं कक्षा से नीचे',
            '8th Pass': '8वीं पास',
            '10th Pass': '10वीं पास',
            '12th Pass / Intermediate': '12वीं पास / इंटरमीडिएट',
            'ITI Certificate': 'आईटीआई प्रमाणपत्र',
            'Polytechnic Diploma': 'पॉलिटेक्निक डिप्लोमा',
            'Vocational Training Certificate': 'व्यावसायिक प्रशिक्षण प्रमाणपत्र',
            'Undergraduate (Pursuing)': 'स्नातक (अध्ययनरत)',
            'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'स्नातक डिग्री',
            'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'स्नातकोत्तर डिग्री',
            'Doctorate (PhD)': 'डॉक्टरेट (पीएचडी)'
        },
        learning_pace_options: {
            'Full-time': 'पूर्णकालिक',
            'Part-time': 'अंशकालिक',
            'Weekend only': 'केवल सप्ताहांत',
            'Self-paced (Online)': 'स्व-गति (ऑनलाइन)',
            'Flexible (Hybrid)': 'लचीला (हाइब्रिड)'
        },
        common_skills: {
            'Programming (Java, Python, C, etc.)': 'प्रोग्रामिंग (जावा, पायथन, सी, आदि)',
            'Web Development (HTML, CSS, PHP, JS)': 'वेब डेवलपमेंट (एचटीएमएल, सीएसएस, पीएचपी, जेएस)',
            'Data Science / AI / ML': 'डेटा साइंस / एआई / एमएल',
            'Database Management (SQL, MongoDB)': 'डेटाबेस प्रबंधन (एसक्यूएल, मोंगोडीबी)',
            'Cloud Computing (AWS, IBM Watson, Azure)': 'क्लाउड कंप्यूटिंग (एडब्ल्यूएस, आईबीएम वाटसन, एज़्योर)',
            'Automation (UiPath, RPA)': 'स्वचालन (यूआईपाथ, आरपीए)',
            'Cybersecurity': 'साइबर सुरक्षा',
            'Mobile Development': 'मोबाइल डेवलपमेंट',
            'UI/UX Design': 'यूआई/यूएक्स डिजाइन',
            'Graphic Design': 'ग्राफिक डिजाइन',
            'Video Editing': 'वीडियो एडिटिंग',
            'Problem-Solving': 'समस्या-समाधान',
            'Data Analysis': 'डेटा विश्लेषण',
            'Critical Thinking': 'महत्वपूर्ण सोच',
            'Research & Development': 'अनुसंधान और विकास',
            'Project Management': 'परियोजना प्रबंधन',
            'Team Collaboration': 'टीम सहयोग',
            'Leadership / Coordination': 'नेतृत्व / समन्वय',
            'Entrepreneurship / Business Planning': 'उद्यमिता / व्यापार योजना',
            'Marketing & Strategy': 'विपणन और रणनीति',
            'Digital Marketing': 'डिजिटल विपणन',
            'Sales': 'बिक्री',
            'Accounting': 'लेखांकन',
            'Customer Service': 'ग्राहक सेवा',
            'Innovation & Idea Generation': 'नवाचार और विचार सृजन',
            'Content Writing / Presentation': 'सामग्री लेखन / प्रस्तुति',
            'Design Thinking': 'डिजाइन सोच',
            'Public Speaking': 'सार्वजनिक बोल',
            'Communication Skills': 'संचार कौशल',
            'Time Management': 'समय प्रबंधन',
            'Adaptability': 'अनुकूलनशीलता',
            'Decision Making': 'निर्णय लेना',
            'Networking': 'नेटवर्किंग',
            'Spoken English': 'बोली जाने वाली अंग्रेजी',
            'IBM Watson': 'आईबीएम वाटसन',
            'UiPath (RPA)': 'यूआईपाथ (आरपीए)',
            'Git/GitHub': 'गिट/गिटहब',
            'MS Office / Google Workspace': 'एमएस ऑफिस / गूगल वर्कस्पेस',
            'Data Entry': 'डेटा प्रविष्टि',
            'Electrical Wiring': 'विद्युत वायरिंग',
            'Plumbing': 'पाइपलाइन',
            'Welding': 'वेल्डिंग',
            'Carpentry': 'बढ़ईगीरी',
            'Automotive Repair': 'ऑटोमोटिव मरम्मत',
            'Cooking & Baking': 'खाना पकाने और पकाना',
            'Healthcare Assistance': 'स्वास्थ्य सेवा सहायता',
            'Mechanical Drawing': 'यांत्रिक ड्राइंग',
        },
        career_aspirations: {
            'Technologist / Engineer': 'प्रौद्योगिकीविद् / इंजीनियर',
            'Data Analyst / AI Specialist': 'डेटा विश्लेषक / एआई विशेषज्ञ',
            'Doctor / Medical Professional': 'डॉक्टर / चिकित्सा पेशेवर',
            'Government / Public Sector': 'सरकार / सार्वजनिक क्षेत्र',
            'Researcher / Scientist': 'शोधकर्ता / वैज्ञानिक',
            'Innovator / Problem Solver': 'नवोन्मेषक / समस्या समाधानकर्ता',
            'Entrepreneur / Startup Founder': 'उद्यमी / स्टार्टअप संस्थापक',
            'Business Leader / Manager': 'व्यापार नेता / प्रबंधक',
            'Social Entrepreneur / Change Maker': 'सामाजिक उद्यमी / परिवर्तन निर्माता',
            'Educator / Mentor': 'शिक्षक / संरक्षक',
            'Creative Designer / Innovator': 'रचनात्मक डिजाइनर / नवोन्मेषक',
            'Global Professional / International Career': 'वैश्विक पेशेवर / अंतर्राष्ट्रीय करियर',
            'Full Stack Developer': 'फुल स्टैक डेवलपर',
            'Cloud Computing Engineer': 'क्लाउड कंप्यूटिंग इंजीनियर',
            'Cybersecurity Analyst': 'साइबर सुरक्षा विश्लेषक',
            'Digital Marketing Manager': 'डिजिटल मार्केटिंग मैनेजर',
            'Logistics and Supply Chain Manager': 'लॉजिस्टिक्स और आपूर्ति श्रृंखला प्रबंधक',
            'Solar Panel Technician': 'सौर पैनल तकनीशियन',
            'EV Charging Station Technician': 'ईवी चार्जिंग स्टेशन तकनीशियन',
            'Organic Farming Specialist': 'जैविक खेती विशेषज्ञ',
            'Drone Operator': 'ड्रोन ऑपरेटर',
            '3D Printing Technician': '3डी प्रिंटिंग तकनीशियन',
            'AR/VR Developer': 'एआर/वीआर डेवलपर',
            'Robotics Engineer': 'रोबोटिक्स इंजीनियर',
            'Certified Nursing Assistant (CNA)': 'प्रमाणित नर्सिंग सहायक (सीएनए)',
            'Medical Lab Technician': 'मेडिकल लैब तकनीशियन',
        },
        competitive_exams: {
            'GATE': 'गेट (इंजीनियरिंग में स्नातक योग्यता परीक्षा)',
            'NEET_PG': 'नीट-पीजी (स्नातकोत्तर)',
            'UPSC_CSE': 'यूपीएससी सिविल सेवा परीक्षा',
            'CAT': 'कैट (सामान्य प्रवेश परीक्षा)',
            'SSC_CGL': 'एसएससी सीजीएल (संयुक्त स्नातक स्तर)',
            'IBPS_PO': 'आईबीपीएस पीओ (प्रोबेशनरी ऑफिसर)',
            'UGC_NET': 'यूजीसी नेट (राष्ट्रीय पात्रता परीक्षा)',
            'JEE': 'जेईई मुख्य और उन्नत'
        }
    }
  },
  bn: { // Bengali
    common: { back: 'পিছনে', next: 'পরবর্তী', backAria: 'পিছনে যান' },
    header: { about: 'সম্পর্কে', welcome: 'স্বাগতম', logout: 'লগআউট' },
    footer: { about: 'আমাদের সম্পর্কে', privacy: 'গোপনীয়তা নীতি', contact: 'যোগাযোগ', copyright: '© {year} ন্যাশনাল কাউন্সিল ফর ভোকেশনাল এডুকেশন অ্যান্ড ট্রেনিং (NCVET)। সর্বস্বত্ব সংরক্ষিত।', poweredBy: 'একটি দক্ষ ভারতের জন্য AI দ্বারা চালিত।' },
    login: { welcomeBack: "ফিরে আসার জন্য স্বাগতম!", signInToContinue: "আপনার যাত্রা চালিয়ে যেতে সাইন ইন করুন।", emailAddress: "ইমেল ঠিকানা", password: "পাসওয়ার্ড", forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?", signIn: "সাইন ইন করুন", signingIn: "সাইন ইন করা হচ্ছে...", noAccount: "অ্যাকাউন্ট নেই?", signUp: "সাইন আপ করুন", error: { invalidCredentials: "অবৈধ ইমেল বা পাসওয়ার্ড। আবার চেষ্টা করুন।", unknown: "একটি অজানা ত্রুটি ঘটেছে। পরে আবার চেষ্টা করুন।" } },
    register: { title: "আপনার অ্যাকাউন্ট তৈরি করুন", subtitle: "আজই আপনার ব্যক্তিগতকৃত দক্ষতা যাত্রা শুরু করুন।", name: { label: "পুরো নাম", placeholder: "যেমন, প্রিয়া শর্মা" }, email: { label: "ইমেল ঠিকানা" }, password: { label: "পাসওয়ার্ড" }, createAccount: "অ্যাকাউন্ট তৈরি করুন", creatingAccount: "অ্যাকাউন্ট তৈরি করা হচ্ছে...", alreadyHaveAccount: "already have an account?", signIn: "সাইন ইন করুন", backToLogin: "লগইনে ফিরে যান", backToLoginAria: "লগইনে ফিরে যান", error: { allFieldsRequired: "সমস্ত ক্ষেত্র প্রয়োজনীয়।", unknown: "নিবন্ধনের সময় একটি অজানা ত্রুটি ঘটেছে।", passwordTooShort: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।', emailExists: 'এই ইমেল ঠিকানা দিয়ে একটি অ্যাকাউন্ট ইতিমধ্যে বিদ্যমান।', passwordInUse: 'এই পাসওয়ার্ডটি অন্য একটি অ্যাকাউন্ট দ্বারা ব্যবহৃত হচ্ছে। দয়া করে একটি ভিন্ন পাসওয়ার্ড চয়ন করুন।' }, alert: { success: "নিবন্ধন সফল! দয়া করে লগ ইন করুন।" } },
    forgotPassword: { title: "আপনার পাসওয়ার্ড পুনরায় সেট করুন", subtitle: "আপনার ইমেল লিখুন এবং আমরা আপনাকে আপনার অ্যাকাউন্টে ফিরে আসার জন্য একটি লিঙ্ক পাঠাব।", email: { label: "ইমেল ঠিকানা" }, sendResetLink: "রিসেট লিঙ্ক পাঠান", rememberPassword: "আপনার পাসওয়ার্ড মনে আছে?", signIn: "সাইন ইন করুন", backToLogin: "লগইনে ফিরে যান", backToLoginAria: "লগইনে ফিরে যান", submitted: { title: "আপনার ইমেল পরীক্ষা করুন", subtitle: "যদি {email} সহ একটি অ্যাকাউন্ট বিদ্যমান থাকে, আমরা আপনার পাসওয়ার্ড পুনরায় সেট করার জন্য নির্দেশাবলী পাঠিয়েছি।", backToSignIn: "সাইন ইন করতে ফিরে যান" } },
    dashboard: { welcome: "ফিরে আসার জন্য স্বাগতম", subtitle: "আপনি নীচে আপনার সংরক্ষিত দক্ষতার পথগুলি দেখতে পারেন বা একটি নতুন তৈরি করতে পারেন।", generateNew: "নতুন দক্ষতার পথ তৈরি করুন", savedOn: "সংরক্ষিত হয়েছে", viewPathway: "পথ দেখুন", noSavedPathways: { title: "কোনও সংরক্ষিত পথ নেই", subtitle: "একটি নতুন দক্ষতার পথ তৈরি করে শুরু করুন।" } },
    form: { title: "আপনার দক্ষতার পথ আবিষ্কার করুন", subtitle: "আপনার ব্যক্তিগতকৃত কর্মজীবনের পরিকল্পনা পেতে নীচের পদক্ষেপগুলি সম্পূর্ণ করুন।", step1: { title: "আপনার পটভূমি", academicBackground: { label: "সর্বোচ্চ শিক্ষাগত পটভূমি" }, priorSkills: { label: "পূর্ববর্তী দক্ষতা বা অভিজ্ঞতা (প্রযোজ্য সমস্ত নির্বাচন করুন)", helper: "আপনার ইতিমধ্যে থাকা কোনও দক্ষতা নির্বাচন করুন। এটি আমাদের আপনার পথটি তৈরি করতে সহায়তা করবে।" } }, step2: { title: "আপনার লক্ষ্য", careerAspiration: { label: "কর্মজীবনের আকাঙ্ক্ষা / লক্ষ্য", placeholder: "যেমন, সোলার প্যানেল টেকনিশিয়ান, এআই/এমএল বিশেষজ্ঞ" }, preferredLocation: { label: "পছন্দের কাজের অবস্থান (শহর/রাজ্য)", placeholder: "যেমন, বেঙ্গালুরু, কর্ণাটক" }, learningPace: { label: "পছন্দের শেখার গতি" }, preferredLanguage: { label: "পথের জন্য পছন্দের ভাষা" }, generatePathway: "পথ তৈরি করুন" } },
    pathwayGraph: { title: "আপনার শেখার রোডম্যাপ" },
    pathwayDisplay: { share: 'পথ ভাগ করুন', linkCopied: 'লিঙ্ক কপি করা হয়েছে!', shareFailed: 'ভাগ করতে ব্যর্থ', timelineTitle: 'আপনার শেখার সময়রেখা', duration: 'সময়কাল:', nsqfLevel: 'NSQF স্তর:', watchSuggested: 'প্রস্তাবিত টিউটোরিয়াল দেখুন', findTutorials: 'ইউটিউবে টিউটোরিয়াল খুঁজুন', searchPrepared: "আমরা আপনার জন্য প্রাসঙ্গিক ভিডিওর একটি অনুসন্ধান প্রস্তুত করেছি।", backToForm: 'ফর্মে ফিরে যান', savePathway: 'পথ সংরক্ষণ করুন', prepareForExams: 'পরীক্ষার জন্য প্রস্তুতি নিন', provideFeedback: 'মতামত দিন', downloadPathway: 'পথ ডাউনলোড করুন' },
    marketInsights: { title: 'ক্যারিয়ার বাজারের অন্তর্দৃষ্টি', jobDemand: 'চাকরির চাহিদা', salary: 'বেতনের প্রত্যাশা (প্রবেশ-স্তর)', hiringCompanies: 'শীর্ষ নিয়োগকারী সংস্থা', keySkills: 'চাহিদা থাকা মূল দক্ষতা' },
    careerGuidance: { title: 'ব্যক্তিগতকৃত ক্যারিয়ার নির্দেশিকা', companiesAndSectors: 'শীর্ষ সংস্থা ও খাত', topPick: 'শীর্ষ বাছাই', recommendedCompany: 'আপনার প্রস্তাবিত সংস্থা', roadmap: '{companyName}-এ চাকরি পাওয়ার জন্য আপনার রোডম্যাপ', skillsToHighlight: 'তুলে ধরার মতো দক্ষতা', interviewPrep: 'সাক্ষাৎকারের প্রস্তুতি', networkingTips: 'নেটওয়ার্কিং টিপস' },
    chat: { title: 'এআই দক্ষতা সহকারী', initialMessage: 'নমস্কার! আমি আজ আপনার কর্মজীবন এবং দক্ষতা যাত্রায় আপনাকে কীভাবে সাহায্য করতে পারি?', unavailable: 'দুঃখিত, চ্যাট সহকারী বর্তমানে অনুপলব্ধ।', errorMessage: 'দুঃখিত, আমি একটি ত্রুটির সম্মুখীন হয়েছি। আবার চেষ্টা করুন।', placeholder: 'একটি প্রশ্ন জিজ্ঞাসা করুন...' },
    examHub: { title: 'পরীক্ষা প্রস্তুতি হাব', downloadPlan: 'পরিকল্পনা ডাউনলোড করুন', backToPathway: 'পথে ফিরে যান', generating: 'আপনার অধ্যয়নের পরিকল্পনা তৈরি করা হচ্ছে...', showPriorityOnly: 'শুধুমাত্র অগ্রাধিকার দেখান', noPriorityItems: 'আপনি কোনো আইটেমকে উচ্চ অগ্রাধিকার হিসেবে চিহ্নিত করেননি।', error: { title: 'ত্রুটি', failed: 'অধ্যয়নের পরিকল্পনা তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।', selectExam: 'একটি অধ্যয়নের পরিকল্পনা পেতে দয়া করে একটি পরীক্ষা নির্বাচন করুন।' }, plan: { title: '{examName}-এর জন্য অধ্যয়নের পরিকল্পনা', roadmap: 'অধ্যয়নের রোডম্যাপ', books: 'প্রস্তাবিত বই', courses: 'অনলাইন কোর্স', questions: 'অনুশীলন প্রশ্ন', question: 'প্রশ্ন {index}', answer: 'উত্তর:' }, form: { title: 'একটি পরীক্ষা নির্বাচন করুন', subtitle: 'একটি ব্যক্তিগতকৃত অধ্যয়নের পরিকল্পনা তৈরি করতে একটি প্রতিযোগিতামূলক পরীক্ষা চয়ন করুন।', label: 'প্রতিযোগিতামূলক পরীক্ষা নির্বাচন করুন', button: 'অধ্যয়নের পরিকল্পনা তৈরি করুন' } },
    feedbackModal: { title: 'মতামত দিন', close: 'মডাল বন্ধ করুন', subtitle: 'এই পথের সুপারিশটি কেমন ছিল? আপনার অন্তর্দৃষ্টি আমাদের এআই উন্নত করতে সাহায্য করে।', placeholder: "যেমন, পদক্ষেপগুলি খুব স্পষ্ট ছিল, কিন্তু আমি নতুনদের জন্য আরও সম্পদ দেখতে চাই...", cancel: 'বাতিল করুন', submit: 'মতামত জমা দিন', submitted: { title: 'ধন্যবাদ!', message: 'আপনার মতামত গৃহীত হয়েছে। আমাদের উন্নত করতে সাহায্য করার জন্য আমরা আপনার প্রশংসা করি।' } },
    app: { loading: { title: "আপনার ব্যক্তিগতকৃত পথ তৈরি করা হচ্ছে...", subtitle: "আমাদের এআই আপনার জন্য নিখুঁত দক্ষতা যাত্রা তৈরি করতে আপনার প্রোফাইল বিশ্লেষণ করছে।" }, error: { pathwayGeneration: "পথ তৈরি করতে ব্যর্থ। আপনার API কী পরীক্ষা করে আবার চেষ্টা করুন।", userNotFound: "ব্যবহারকারী পাওয়া যায়নি।" }, alert: { pathwaySaved: "পথ সফলভাবে সংরক্ষিত হয়েছে!", pathwaySaveFailed: "পথ সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।" } },
    about: { title: "NCVET স্কিল নেভিগেটর এআই সম্পর্কে", subtitle: "ভারতে একটি সফল বৃত্তিমূলক কর্মজীবনের জন্য আপনার ব্যক্তিগতকৃত গাইড।", mission: { title: "আমাদের লক্ষ্য", description: "আমাদের লক্ষ্য হল ভারতের প্রত্যেক শিক্ষার্থীকে তাদের আকাঙ্ক্ষা এবং শ্রম বাজারের রিয়েল-টাইম চাহিদার সাথে সামঞ্জস্যপূর্ণ বৃত্তিমূলক দক্ষতা অর্জনের জন্য একটি স্পষ্ট, ব্যক্তিগতকৃত এবং অভিযোজিত পথের সাথে ক্ষমতায়ন করা। আমরা শিক্ষা এবং কর্মসংস্থানের মধ্যে ব্যবধান পূরণ করার লক্ষ্য রাখি, একটি সমৃদ্ধ ভারতের জন্য একটি দক্ষ কর্মী বাহিনী তৈরি করা।" }, whoWeAre: { title: "আমরা কারা", description1: "স্কিল নেভিগেটর এআই হল <strong>ন্যাশনাল কাউন্সিল ফর ভোকেশনাল এডুকেশন অ্যান্ড ট্রেনিং (NCVET)</strong>-এর একটি উদ্যোগ, যা ভারতে বৃত্তিমূলক শিক্ষার জন্য জাতীয় নিয়ন্ত্রক। আমরা সারা দেশে দক্ষতা উন্নয়নের জন্য উচ্চ মান স্থাপন এবং বজায় রাখতে প্রতিশ্রুতিবদ্ধ।", description2: "এই প্ল্যাটফর্মটি ন্যাশনাল স্কিলস কোয়ালিফিকেশন ফ্রেমওয়ার্ক (NSQF)-এর সাথে সরাসরি একীভূত হয় যাতে প্রতিটি সুপারিশ বিশ্বাসযোগ্য, স্বীকৃত এবং আপনার কর্মজীবনের জন্য মূল্যবান হয় তা নিশ্চিত করা যায়।" }, technology: { title: "প্রযুক্তি", description1: "এই প্ল্যাটফর্মটি অত্যাধুনিক কৃত্রিম বুদ্ধিমত্তা দ্বারা চালিত। আমরা আপনার শিক্ষাগত পটভূমি, বিদ্যমান দক্ষতা এবং কর্মজীবনের লক্ষ্য সহ আপনার অনন্য প্রোফাইল বিশ্লেষণ করতে উন্নত এআই মডেল ব্যবহার করি।", description2: "আমাদের এআই সুপারিশ ইঞ্জিন তারপর আপনার প্রোফাইলকে NCVET-অনুমোদিত যোগ্যতা এবং রিয়েল-টাইম শ্রম বাজারের ডেটার একটি বিশাল ডাটাবেসের বিপরীতে ম্যাপ করে শুধুমাত্র আপনার জন্য একটি কাস্টমাইজড শেখার যাত্রা তৈরি করে।" } },
    features: { title: "কেন স্কিল নেভিগেটর এআই বেছে নেবেন?", subtitle: "আপনার কর্মজীবনের যাত্রাকে অত্যাধুনিক প্রযুক্তি এবং সরকার-স্বীকৃত মান দিয়ে ক্ষমতায়ন করার জন্য ডিজাইন করা একটি ব্যাপক প্ল্যাটফর্ম।", aiPowered: { title: "এআই-চালিত সুপারিশ", description: "আমাদের স্মার্ট এআই আপনার পটভূমি এবং লক্ষ্যগুলি বোঝে যাতে শুধুমাত্র আপনার জন্য একটি অনন্য শেখার পথ তৈরি করা যায়, যা একটি এআই/এমএল-চালিত শিক্ষার্থী প্রোফাইলিং এবং সুপারিশ ইঞ্জিনের উপর ভিত্তি করে।" }, govRecognized: { title: "সরকার স্বীকৃত পথ", description: "আমাদের সমস্ত প্রস্তাবিত কোর্সগুলি জাতীয় মান (NCVET & NSQF) এর সাথে সামঞ্জস্যপূর্ণ, যা প্রশিক্ষণ প্রোগ্রামগুলির সাথে সরাসরি একীকরণের সাথে গুরুত্বপূর্ণ যোগ্যতার জন্য।" }, clearDashboard: { title: "পরিষ্কার ক্যারিয়ার ড্যাশবোর্ড", description: "শিক্ষার্থী, প্রশিক্ষক এবং নীতি নির্ধারকদের জন্য একটি সহজ, ব্যবহারযোগ্য ক্যারিয়ার নির্দেশিকা ড্যাশবোর্ডে আপনার অগ্রগতি ট্র্যাক করুন এবং ক্যারিয়ারের বিকল্পগুলি অন্বেষণ করুন।" }, jobInsights: { title: "রিয়েল-টাইম চাকরির অন্তর্দৃষ্টি", description: "আমরা আপনার দক্ষতাকে শ্রম বাজারের বুদ্ধিমত্তার রিয়েল-টাইম ম্যাপিংয়ের সাথে যা চাহিদা রয়েছে তার সাথে সংযুক্ত করি, যা শিল্পের সারিবদ্ধতা নিশ্চিত করে।" }, multilingual: { title: "আপনার ভাষায় শেখা", description: "একাধিক ভাষায় নির্দেশিকা অ্যাক্সেস করুন। আমাদের প্ল্যাটফর্মটি বিভিন্ন শিক্ষার্থী গোষ্ঠীর জন্য একটি বহুভাষিক, অন্তর্ভুক্তিমূলক এবং অ্যাক্সেসযোগ্য সমাধান।" }, reliablePlatform: { title: "নির্ভরযোগ্য এবং দ্রুত প্ল্যাটফর্ম", description: "আমাদের শক্তিশালী, স্কেলেবল আর্কিটেকচার একটি মসৃণ এবং নির্ভরযোগ্য অভিজ্ঞতা নিশ্চিত করে, যা সারা ভারতে লক্ষ লক্ষ শিক্ষার্থীকে সমর্থন করতে প্রস্তুত।" }, dataSafe: { title: "আপনার ডেটা নিরাপদ", description: "আমরা সর্বদা আপনার ব্যক্তিগত তথ্য রক্ষা করার জন্য কঠোর গোপনীয়তা এবং সুরক্ষা নিয়ম অনুসরণ করি, যা সম্পূর্ণ সম্মতি নিশ্চিত করে।" } },
    contactPage: { title: "যোগাযোগ করুন", subtitle: "আমরা সাহায্য করতে এখানে আছি। নিম্নলিখিত চ্যানেলগুলির মাধ্যমে আমাদের সাথে যোগাযোগ করুন।", addressTitle: "আমাদের ঠিকানা", address: "জাতীয় বৃত্তিমূলক শিক্ষা ও প্রশিক্ষণ পরিষদ (NCVET)<br>কৌশল ভবন, বি-২, পুসা রোড, করোল বাগ,<br>নয়াদিল্লি – ১১০০০৫, ভারত", phoneTitle: "ফোন নম্বর", phone: "+91 8328605892", emailTitle: "ইমেল ঠিকানা", email: "shaikhydumiya1127@gmail.com", note: "এই অ্যাপ্লিকেশন সম্পর্কিত অনুসন্ধানের জন্য, দয়া করে উপরে প্রদত্ত যোগাযোগের বিবরণ ব্যবহার করুন।" },
    privacyPolicy: { title: "গোপনীয়তা নীতি", lastUpdated: "শেষ আপডেট: ১ আগস্ট, ২০২৪", introduction: { title: "ভূমিকা", content: "<p>NCVET স্কিল নেভিগেটর এআই-তে আপনাকে স্বাগতম। আমরা আপনার গোপনীয়তা রক্ষা করতে প্রতিশ্রুতিবদ্ধ। আপনি যখন আমাদের অ্যাপ্লিকেশন ব্যবহার করেন তখন আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার, প্রকাশ এবং সুরক্ষিত করি তা এই গোপনীয়তা নীতি ব্যাখ্যা করে। দয়া করে এই নীতিটি সাবধানে পড়ুন।</p>" }, informationWeCollect: { title: "আমরা যে তথ্য সংগ্রহ করি", content: "<p>আমরা বিভিন্ন উপায়ে আপনার সম্পর্কে তথ্য সংগ্রহ করতে পারি। পরিষেবাটিতে আমরা যে তথ্য সংগ্রহ করতে পারি তার মধ্যে রয়েছে:</p><ul><li><strong>ব্যক্তিগত ডেটা:</strong> ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য, যেমন আপনার নাম এবং ইমেল ঠিকানা, যা আপনি পরিষেবাটিতে নিবন্ধন করার সময় স্বেচ্ছায় আমাদের দেন।</li><li><strong>শিক্ষার্থীর প্রোফাইল ডেটা:</strong> দক্ষতার পথ তৈরি করতে আপনার দেওয়া তথ্য, যেমন আপনার শিক্ষাগত পটভূমি, পূর্ববর্তী দক্ষতা, কর্মজীবনের আকাঙ্ক্ষা এবং শেখার পছন্দ।</li><li><strong>ব্যবহারের ডেটা:</strong> আমরা স্বয়ংক্রিয়ভাবে পরিষেবাটিতে আপনার অ্যাক্সেস এবং ব্যবহার সম্পর্কে তথ্য সংগ্রহ করতে পারি, তবে এই ডেটা বেনামী এবং শুধুমাত্র পরিষেবা উন্নতির জন্য ব্যবহৃত হয়।</li></ul>" }, howWeUseInfo: { title: "আমরা আপনার তথ্য কীভাবে ব্যবহার করি", content: "<p>আপনার সম্পর্কে সঠিক তথ্য থাকা আমাদের আপনাকে একটি মসৃণ, দক্ষ এবং কাস্টমাইজড অভিজ্ঞতা প্রদান করতে দেয়। বিশেষত, আমরা পরিষেবাটির মাধ্যমে আপনার সম্পর্কে সংগৃহীত তথ্য ব্যবহার করতে পারি:</p><ul><li>আপনার অ্যাকাউন্ট তৈরি এবং পরিচালনা করতে।</li><li>ব্যক্তিগত বৃত্তিমূলক প্রশিক্ষণের পথ তৈরি করতে।</li><li>পরিষেবার দক্ষতা এবং পরিচালনা উন্নত করতে।</li><li>আপনার অভিজ্ঞতা উন্নত করতে ব্যবহার এবং প্রবণতা নিরীক্ষণ এবং বিশ্লেষণ করতে।</li><li>ব্যবহারকারীর জিজ্ঞাসার উত্তর দিতে এবং সহায়তা প্রদান করতে।</li></ul>" }, dataSharing: { title: "ডেটা শেয়ারিং এবং প্রকাশ", content: "<p>আমরা আপনার ব্যক্তিগতভাবে শনাক্তযোগ্য তথ্য বাইরের পক্ষের কাছে বিক্রি, বাণিজ্য বা অন্যথায় হস্তান্তর করি না। এর মধ্যে বিশ্বস্ত তৃতীয় পক্ষ অন্তর্ভুক্ত নয় যারা আমাদের অ্যাপ্লিকেশন পরিচালনায় আমাদের সহায়তা করে, যতক্ষণ না সেই পক্ষগুলি এই তথ্য গোপন রাখতে সম্মত হয়। আমরা আপনার তথ্য প্রকাশ করতে পারি যখন আমরা বিশ্বাস করি যে আইন মেনে চলা, আমাদের সাইট নীতি প্রয়োগ করা, বা আমাদের বা অন্যদের অধিকার, সম্পত্তি বা নিরাপত্তা রক্ষা করার জন্য প্রকাশ উপযুক্ত। বেনামী, সমষ্টিগত ডেটা গবেষণা এবং নীতি নির্ধারণের উদ্দেশ্যে ব্যবহার করা যেতে পারে।</p>" }, dataSecurity: { title: "ডেটা নিরাপত্তা", content: "<p>আমরা আপনার ব্যক্তিগত তথ্য রক্ষা করতে প্রশাসনিক, প্রযুক্তিগত এবং শারীরিক নিরাপত্তা ব্যবস্থা ব্যবহার করি। যদিও আমরা আপনার দেওয়া ব্যক্তিগত তথ্য সুরক্ষিত করার জন্য যুক্তিসঙ্গত পদক্ষেপ নিয়েছি, দয়া করে সচেতন থাকুন যে আমাদের প্রচেষ্টা সত্ত্বেও, কোনও নিরাপত্তা ব্যবস্থা নিখুঁত বা দুর্ভেদ্য নয়, এবং কোনও ডেটা ট্রান্সমিশন পদ্ধতি কোনও अवरोधন বা অন্য ধরণের অপব্যবহারের বিরুদ্ধে গ্যারান্টি দেওয়া যায় না।</p>" }, yourRights: { title: "আপনার অধিকার", content: "<p>আপনার কাছে আমাদের কাছে থাকা তথ্য অ্যাক্সেস, আপডেট বা মুছে ফেলার অধিকার রয়েছে। যেহেতু এটি ব্রাউজার স্টোরেজ ব্যবহার করে একটি প্রদর্শন অ্যাপ্লিকেশন, তাই আপনি এই সাইটের জন্য আপনার ব্রাউজারের স্থানীয় স্টোরেজ পরিষ্কার করে আপনার ডেটা পরিষ্কার করতে পারেন। একটি পূর্ণ-স্কেল অ্যাপ্লিকেশনে, আপনার এই অধিকারগুলি সরাসরি প্রয়োগ করার জন্য অ্যাকাউন্ট ম্যানেজমেন্ট সরঞ্জাম থাকবে।</p>" }, changes: { title: "এই গোপনীয়তা নীতিতে পরিবর্তন", content: "<p>আমরা সময়ে সময়ে এই গোপনীয়তা নীতি আপডেট করতে পারি। আমরা এই পৃষ্ঠায় নতুন গোপনীয়তা নীতি পোস্ট করে আপনাকে কোনও পরিবর্তন সম্পর্কে অবহিত করব। আপনাকে কোনও পরিবর্তনের জন্য পর্যায়ক্রমে এই গোপনীয়তা নীতি পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।</p>" }, contact: { title: "যোগাযোগ করুন", content: "<p>এই গোপনীয়তা নীতি সম্পর্কে আপনার যদি কোনও প্রশ্ন থাকে, দয়া করে NCVET-এর সাথে তার অফিসিয়াল সরকারি চ্যানেলের মাধ্যমে যোগাযোগ করুন। এই অ্যাপ্লিকেশনটি একটি প্রোটোটাইপ এবং এর কোনও ডেডিকেটেড সাপোর্ট টিম নেই।</p>" } },
    constants: {
        academic_backgrounds: { 'Below 8th Standard': '৮ম শ্রেণীর নিচে', '8th Pass': '৮ম শ্রেণী পাস', '10th Pass': '১০ম শ্রেণী পাস', '12th Pass / Intermediate': '১২শ শ্রেণী পাস / ইন্টারমিডিয়েট', 'ITI Certificate': 'আইটিআই সার্টিফিকেট', 'Polytechnic Diploma': 'পলিটেকনিক ডিপ্লোমা', 'Vocational Training Certificate': 'বৃত্তিমূলক প্রশিক্ষণ সার্টিফিকেট', 'Undergraduate (Pursuing)': 'স্নাতক (চলমান)', 'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'স্নাতক ডিগ্রী', 'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'স্নাতকোত্তর ডিগ্রী', 'Doctorate (PhD)': 'ডক্টরেট (পিএইচডি)' },
        learning_pace_options: { 'Full-time': 'পূর্ণকালীন', 'Part-time': 'খণ্ডকালীন', 'Weekend only': 'শুধুমাত্র সপ্তাহান্তে', 'Self-paced (Online)': 'স্ব-গতি (অনলাইন)', 'Flexible (Hybrid)': 'নমনীয় (হাইব্রিড)' },
        common_skills: { 'Programming (Java, Python, C, etc.)': 'প্রোগ্রামিং (জাভা, পাইথন, সি, ইত্যাদি)', 'Web Development (HTML, CSS, PHP, JS)': 'ওয়েব ডেভেলপমেন্ট (এইচটিএমএল, সিএসএস, পিএইচপি, জেএস)', 'Data Science / AI / ML': 'ডেটা সায়েন্স / এআই / এমএল', 'Database Management (SQL, MongoDB)': 'ডাটাবেস ম্যানেজমেন্ট (এসকিউএল, মঙ্গোডিবি)', 'Cloud Computing (AWS, IBM Watson, Azure)': 'ক্লাউড কম্পিউটিং (এডব্লিউএস, আইবিএম ওয়াটসন, অ্যাজুর)', 'Automation (UiPath, RPA)': 'অটোমেশন (ইউআইপাথ, আরপিএ)', Cybersecurity: 'সাইবার নিরাপত্তা', 'Mobile Development': 'মোবাইল ডেভেলপমেন্ট', 'UI/UX Design': 'ইউআই/ইউএক্স ডিজাইন', 'Graphic Design': 'গ্রাফিক ডিজাইন', 'Video Editing': 'ভিডিও এডিটিং', 'Problem-Solving': 'সমস্যা-সমাধান', 'Data Analysis': 'ডেটা বিশ্লেষণ', 'Critical Thinking': 'সমালোচনামূলক চিন্তাভাবনা', 'Research & Development': 'গবেষণা ও উন্নয়ন', 'Project Management': 'প্রকল্প ব্যবস্থাপনা', 'Team Collaboration': 'দলবদ্ধ সহযোগিতা', 'Leadership / Coordination': 'নেতৃত্ব / সমন্বয়', 'Entrepreneurship / Business Planning': 'উদ্যোক্তা / ব্যবসায়িক পরিকল্পনা', 'Marketing & Strategy': 'বিপণন ও কৌশল', 'Digital Marketing': 'ডিজিটাল মার্কেটিং', Sales: 'বিক্রয়', Accounting: 'হিসাবরক্ষণ', 'Customer Service': 'গ্রাহক সেবা', 'Innovation & Idea Generation': 'উদ্ভাবন ও ধারণা তৈরি', 'Content Writing / Presentation': 'কনটেন্ট লেখা / উপস্থাপনা', 'Design Thinking': 'ডিজাইন থিংকিং', 'Public Speaking': 'জনসাধারণের সামনে বক্তৃতা', 'Communication Skills': 'যোগাযোগ দক্ষতা', 'Time Management': 'সময় ব্যবস্থাপনা', Adaptability: 'অভিযোজনযোগ্যতা', 'Decision Making': 'সিদ্ধান্ত গ্রহণ', Networking: 'নেটওয়ার্কিং', 'Spoken English': 'কথ্য ইংরেজি', 'IBM Watson': 'আইবিএম ওয়াটসন', 'UiPath (RPA)': 'ইউআইপাথ (আরপিএ)', 'Git/GitHub': 'গিট/গিটহাব', 'MS Office / Google Workspace': 'এমএস অফিস / গুগল ওয়ার্কস্পেস', 'Data Entry': 'ডেটা এন্ট্রি', 'Electrical Wiring': 'বৈদ্যুতিক ওয়্যারিং', Plumbing: 'প্লাম্বিং', Welding: 'ওয়েল্ডিং', Carpentry: 'ছুতারের কাজ', 'Automotive Repair': 'অটোমোটিভ মেরামত', 'Cooking & Baking': 'রান্না ও বেকিং', 'Healthcare Assistance': 'স্বাস্থ্যসেবা সহায়তা', 'Mechanical Drawing': 'মেকানিক্যাল ড্রয়িং' },
        career_aspirations: { 'Technologist / Engineer': 'প্রযুক্তিবিদ / প্রকৌশলী', 'Data Analyst / AI Specialist': 'ডেটা বিশ্লেষক / এআই বিশেষজ্ঞ', 'Doctor / Medical Professional': 'ডাক্তার / চিকিৎসা পেশাদার', 'Government / Public Sector': 'সরকারি / পাবলিক সেক্টর', 'Researcher / Scientist': 'গবেষক / বিজ্ঞানী', 'Innovator / Problem Solver': 'উদ্ভাবক / সমস্যা সমাধানকারী', 'Entrepreneur / Startup Founder': 'উদ্যোক্তা / স্টার্টআপ প্রতিষ্ঠাতা', 'Business Leader / Manager': 'ব্যবসায়িক নেতা / ব্যবস্থাপক', 'Social Entrepreneur / Change Maker': 'সামাজিক উদ্যোক্তা / পরিবর্তন নির্মাতা', 'Educator / Mentor': 'শিক্ষক / পরামর্শদাতা', 'Creative Designer / Innovator': 'সৃজনশীল ডিজাইনার / উদ্ভাবক', 'Global Professional / International Career': 'বিশ্বব্যাপী পেশাদার / আন্তর্জাতিক ক্যারিয়ার', 'Full Stack Developer': 'ফুল স্ট্যাক ডেভেলপার', 'Cloud Computing Engineer': 'ক্লাউড কম্পিউটিং ইঞ্জিনিয়ার', 'Cybersecurity Analyst': 'সাইবার নিরাপত্তা বিশ্লেষক', 'Digital Marketing Manager': 'ডিজিটাল মার্কেটিং ম্যানেজার', 'Logistics and Supply Chain Manager': 'লজিস্টিকস এবং সাপ্লাই চেইন ম্যানেজার', 'Solar Panel Technician': 'সোলার প্যানেল টেকনিশিয়ান', 'EV Charging Station Technician': 'ইভি চার্জিং স্টেশন টেকনিশিয়ান', 'Organic Farming Specialist': 'জৈব চাষ বিশেষজ্ঞ', 'Drone Operator': 'ড্রোন অপারেটর', '3D Printing Technician': '৩ডি প্রিন্টিং টেকনিশিয়ান', 'AR/VR Developer': 'এআর/ভিআর ডেভেলপার', 'Robotics Engineer': 'রোবোটিক্স ইঞ্জিনিয়ার', 'Certified Nursing Assistant (CNA)': 'সার্টিফাইড নার্সিং অ্যাসিস্ট্যান্ট (সিএনএ)', 'Medical Lab Technician': 'মেডিকেল ল্যাব টেকনিশিয়ান' },
        competitive_exams: { GATE: 'গেট (গ্র্যাজুয়েট অ্যাপটিটিউড টেস্ট ইন ইঞ্জিনিয়ারিং)', NEET_PG: 'নিট-পিজি (পোস্ট-গ্র্যাজুয়েশন)', UPSC_CSE: 'ইউপিএসসি সিভিল সার্ভিসেস পরীক্ষা', CAT: 'ক্যাট (কমন অ্যাডমিশন টেস্ট)', SSC_CGL: 'এসএসসি সিজিএল (সম্মিলিত স্নাতক স্তর)', IBPS_PO: 'আইবিপিএস পিও (প্রবেশনারি অফিসার)', UGC_NET: 'ইউজিসি নেট (জাতীয় যোগ্যতা পরীক্ষা)', JEE: 'জেইই মেইন ও অ্যাডভান্সড' }
    }
  },
  ta: { // Tamil
    common: { back: 'பின்னால்', next: 'அடுத்து', backAria: 'பின்னால் செல்' },
    header: { about: 'பற்றி', welcome: 'வரவேற்பு', logout: 'வெளியேறு' },
    footer: { about: 'எங்களைப் பற்றி', privacy: 'தனியுரிமைக் கொள்கை', contact: 'தொடர்பு', copyright: '© {year} தேசிய தொழிற்கல்வி மற்றும் பயிற்சி கவுன்சில் (NCVET). அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.', poweredBy: 'திறமையான இந்தியாவிற்காக AI மூலம் இயக்கப்படுகிறது.' },
    login: { welcomeBack: "மீண்டும் வருக!", signInToContinue: "உங்கள் பயணத்தைத் தொடர உள்நுழையவும்.", emailAddress: "மின்னஞ்சல் முகவரி", password: "கடவுச்சொல்", forgotPassword: "கடவுச்சொல்லை மறந்துவிட்டீர்களா?", signIn: "உள்நுழை", signingIn: "உள்நுழைகிறது...", noAccount: "கணக்கு இல்லையா?", signUp: "பதிவு செய்க", error: { invalidCredentials: "தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.", unknown: "ஒரு அறியப்படாத பிழை ஏற்பட்டது. பின்னர் மீண்டும் முயற்சிக்கவும்." } },
    register: { title: "உங்கள் கணக்கை உருவாக்கவும்", subtitle: "இன்றே உங்கள் தனிப்பயனாக்கப்பட்ட திறன் பயணத்தைத் தொடங்குங்கள்.", name: { label: "முழு பெயர்", placeholder: "எ.கா., பிரியா சர்மா" }, email: { label: "மின்னஞ்சல் முகவரி" }, password: { label: "கடவுச்சொல்" }, createAccount: "கணக்கை உருவாக்கு", creatingAccount: "கணக்கை உருவாக்குகிறது...", alreadyHaveAccount: "ஏற்கனவே கணக்கு உள்ளதா?", signIn: "உள்நுழை", backToLogin: "உள்நுழைவுக்குத் திரும்பு", backToLoginAria: "உள்நுழைவுக்குத் திரும்பு", error: { allFieldsRequired: "அனைத்து புலங்களும் தேவை.", unknown: "பதிவின் போது ஒரு அறியப்படாத பிழை ஏற்பட்டது.", passwordTooShort: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் நீளமாக இருக்க வேண்டும்.', emailExists: 'இந்த மின்னஞ்சல் முகவரியுடன் ஒரு கணக்கு ஏற்கனவே உள்ளது.', passwordInUse: 'இந்த கடவுச்சொல் ஏற்கனவே மற்றொரு கணக்கால் பயன்படுத்தப்படுகிறது. தயவுசெய்து வேறு ஒன்றைத் தேர்ந்தெடுக்கவும்.' }, alert: { success: "பதிவு வெற்றி பெற்றது! தயவுசெய்து உள்நுழையவும்." } },
    forgotPassword: { title: "உங்கள் கடவுச்சொல்லை மீட்டமைக்கவும்", subtitle: "உங்கள் மின்னஞ்சலை உள்ளிடவும், உங்கள் கணக்கிற்குத் திரும்புவதற்கான இணைப்பை நாங்கள் உங்களுக்கு அனுப்புவோம்.", email: { label: "மின்னஞ்சல் முகவரி" }, sendResetLink: "மீட்டமைப்பு இணைப்பை அனுப்பு", rememberPassword: "உங்கள் கடவுச்சொல் நினைவிருக்கிறதா?", signIn: "உள்நுழை", backToLogin: "உள்நுழைவுக்குத் திரும்பு", backToLoginAria: "உள்நுழைவுக்குத் திரும்பு", submitted: { title: "உங்கள் மின்னஞ்சலைச் சரிபார்க்கவும்", subtitle: "{email} உடன் ஒரு கணக்கு இருந்தால், உங்கள் கடவுச்சொல்லை மீட்டமைக்க நாங்கள் வழிமுறைகளை அனுப்பியுள்ளோம்.", backToSignIn: "உள்நுழைவுக்குத் திரும்பு" } },
    dashboard: { welcome: "மீண்டும் வருக", subtitle: "நீங்கள் சேமித்த திறன் பாதைகளை கீழே காணலாம் அல்லது புதிய ஒன்றை உருவாக்கலாம்.", generateNew: "புதிய திறன் பாதையை உருவாக்கு", savedOn: "சேமிக்கப்பட்டது", viewPathway: "பாதையைப் பார்", noSavedPathways: { title: "சேமிக்கப்பட்ட பாதைகள் இல்லை", subtitle: "புதிய திறன் பாதையை உருவாக்குவதன் மூலம் தொடங்கவும்." } },
    form: { title: "உங்கள் திறன் பாதையைக் கண்டறியவும்", subtitle: "உங்கள் தனிப்பயனாக்கப்பட்ட தொழில் திட்டத்தைப் பெற கீழே உள்ள படிகளை முடிக்கவும்.", step1: { title: "உங்கள் பின்னணி", academicBackground: { label: "உயர்ந்த கல்விப் பின்னணி" }, priorSkills: { label: "முந்தைய திறன்கள் அல்லது அனுபவம் (பொருந்தக்கூடிய அனைத்தையும் தேர்ந்தெடுக்கவும்)", helper: "உங்களிடம் ஏற்கனவே உள்ள திறன்களைத் தேர்ந்தெடுக்கவும். இது உங்கள் பாதையைத் தனிப்பயனாக்க எங்களுக்கு உதவும்." } }, step2: { title: "உங்கள் இலக்குகள்", careerAspiration: { label: "தொழில் ஆசை / இலக்கு", placeholder: "எ.கா., சோலார் பேனல் தொழில்நுட்பவியலாளர், AI/ML நிபுணர்" }, preferredLocation: { label: "விரும்பிய வேலை இடம் (நகரம்/மாநிலம்)", placeholder: "எ.கா., பெங்களூரு, கர்நாடகா" }, learningPace: { label: "விரும்பிய கற்றல் வேகம்" }, preferredLanguage: { label: "பாதைக்கான விரும்பிய மொழி" }, generatePathway: "பாதையை உருவாக்கு" } },
    pathwayGraph: { title: "உங்கள் கற்றல் வரைபடம்" },
    pathwayDisplay: { share: 'பாதையைப் பகிரவும்', linkCopied: 'இணைப்பு நகலெடுக்கப்பட்டது!', shareFailed: 'பகிர்வதில் தோல்வி', timelineTitle: 'உங்கள் கற்றல் காலவரிசை', duration: 'கால அளவு:', nsqfLevel: 'NSQF நிலை:', watchSuggested: 'பரிந்துரைக்கப்பட்ட பயிற்சியைப் பார்க்கவும்', findTutorials: 'YouTube இல் பயிற்சிகளைக் கண்டறியவும்', searchPrepared: "நாங்கள் உங்களுக்காக தொடர்புடைய வீடியோக்களுக்கான தேடலைத் தயாரித்துள்ளோம்.", backToForm: 'படிவத்திற்குத் திரும்பு', savePathway: 'பாதையைச் சேமி', prepareForExams: 'தேர்வுகளுக்குத் தயாராகுங்கள்', provideFeedback: 'கருத்துக்களை வழங்கவும்', downloadPathway: 'பாதையைப் பதிவிறக்கவும்' },
    marketInsights: { title: 'தொழில் சந்தை நுண்ணறிவு', jobDemand: 'வேலை தேவை', salary: 'சம்பள எதிர்பார்ப்பு (நுழைவு நிலை)', hiringCompanies: 'சிறந்த பணியமர்த்தல் நிறுவனங்கள்', keySkills: 'தேவையில் உள்ள முக்கிய திறன்கள்' },
    careerGuidance: { title: 'தனிப்பயனாக்கப்பட்ட தொழில் வழிகாட்டுதல்', companiesAndSectors: 'சிறந்த நிறுவனங்கள் மற்றும் துறைகள்', topPick: 'சிறந்த தேர்வு', recommendedCompany: 'உங்கள் பரிந்துரைக்கப்பட்ட நிறுவனம்', roadmap: '{companyName} இல் வேலை பெறுவதற்கான உங்கள் வரைபடம்', skillsToHighlight: 'சிறப்பித்துக் காட்ட வேண்டிய திறன்கள்', interviewPrep: 'நேர்காணல் தயாரிப்பு', networkingTips: 'நெட்வொர்க்கிங் குறிப்புகள்' },
    chat: { title: 'AI திறன் உதவியாளர்', initialMessage: 'வணக்கம்! இன்று உங்கள் தொழில் மற்றும் திறன் பயணத்தில் நான் உங்களுக்கு எப்படி உதவ முடியும்?', unavailable: 'மன்னிக்கவும், அரட்டை உதவியாளர் தற்போது கிடைக்கவில்லை.', errorMessage: 'மன்னிக்கவும், ஒரு பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.', placeholder: 'ஒரு கேள்வியைக் கேட்கவும்...' },
    examHub: { title: 'தேர்வு தயாரிப்பு மையம்', downloadPlan: 'திட்டத்தைப் பதிவிறக்கவும்', backToPathway: 'பாதைக்குத் திரும்பு', generating: 'உங்கள் படிப்புத் திட்டத்தை உருவாக்குகிறது...', showPriorityOnly: 'முன்னுரிமையை மட்டும் காட்டு', noPriorityItems: 'நீங்கள் எந்த உருப்படியையும் உயர் முன்னுரிமையாகக் குறிக்கவில்லை.', error: { title: 'பிழை', failed: 'படிப்புத் திட்டத்தை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.', selectExam: 'படிப்புத் திட்டத்தைப் பெற ஒரு தேர்வைத் தேர்ந்தெடுக்கவும்.' }, plan: { title: '{examName} க்கான படிப்புத் திட்டம்', roadmap: 'படிப்பு வரைபடம்', books: 'பரிந்துரைக்கப்பட்ட புத்தகங்கள்', courses: 'ஆன்லைன் படிப்புகள்', questions: 'பயிற்சி கேள்விகள்', question: 'கேள்வி {index}', answer: 'பதில்:' }, form: { title: 'ஒரு தேர்வைத் தேர்ந்தெடுக்கவும்', subtitle: 'ஒரு தனிப்பயனாக்கப்பட்ட படிப்புத் திட்டத்தை உருவாக்க ஒரு போட்டித் தேர்வைத் தேர்வு செய்யவும்.', label: 'போட்டித் தேர்வைத் தேர்ந்தெடுக்கவும்', button: 'படிப்புத் திட்டத்தை உருவாக்கு' } },
    feedbackModal: { title: 'கருத்துக்களை வழங்கவும்', close: 'சாளரத்தை மூடு', subtitle: 'இந்த பாதை பரிந்துரை எப்படி இருந்தது? உங்கள் நுண்ணறிவு எங்கள் AI ஐ மேம்படுத்த உதவுகிறது.', placeholder: "எ.கா., படிகள் மிகவும் தெளிவாக இருந்தன, ஆனால் நான் ஆரம்பநிலையாளர்களுக்கான கூடுதல் ஆதாரங்களைப் பார்க்க விரும்புகிறேன்...", cancel: 'ரத்துசெய்', submit: 'கருத்துக்களைச் சமர்ப்பிக்கவும்', submitted: { title: 'நன்றி!', message: 'உங்கள் கருத்து பெறப்பட்டது. எங்களை மேம்படுத்த உதவியதற்கு நன்றி.' } },
    app: { loading: { title: "உங்கள் தனிப்பயனாக்கப்பட்ட பாதையை உருவாக்குகிறது...", subtitle: "எங்கள் AI உங்களுக்கான சரியான திறன் பயணத்தை உருவாக்க உங்கள் சுயவிவரத்தை பகுப்பாய்வு செய்கிறது." }, error: { pathwayGeneration: "பாதையை உருவாக்க முடியவில்லை. உங்கள் API விசையைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.", userNotFound: "பயனர் காணப்படவில்லை." }, alert: { pathwaySaved: "பாதை வெற்றிகரமாக சேமிக்கப்பட்டது!", pathwaySaveFailed: "பாதையைச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்." } },
    about: { title: "NCVET திறன் நேவிகேটার AI பற்றி", subtitle: "இந்தியாவில் ஒரு வெற்றிகரமான தொழிற்கல்விக்கு உங்கள் தனிப்பயனாக்கப்பட்ட வழிகாட்டி.", mission: { title: "எங்கள் நோக்கம்", description: "இந்தியாவில் உள்ள ஒவ்வொரு கற்பவருக்கும் அவர்களின் आकांक्षाக்கள் மற்றும் தொழிலாளர் சந்தையின் நிகழ்நேர கோரிக்கைகளுடன் ஒத்துப்போகும் தொழிற்கல்வி திறன்களைப் பெறுவதற்கான தெளிவான, தனிப்பயனாக்கப்பட்ட மற்றும் ஏற்புடைய பாதையை வழங்குவதே எங்கள் நோக்கம். கல்விக்கும் வேலைவாய்ப்புக்கும் இடையிலான இடைவெளியைக் குறைத்து, வளர்ந்து வரும் இந்தியாவிற்கு ஒரு திறமையான பணியாளர்களை உருவாக்குவதை நாங்கள் நோக்கமாகக் கொண்டுள்ளோம்." }, whoWeAre: { title: "நாங்கள் யார்", description1: "திறன் நேவிகேটার AI என்பது <strong>தேசிய தொழிற்கல்வி மற்றும் பயிற்சி கவுன்சில் (NCVET)</strong>, இந்தியாவில் தொழிற்கல்விக்கான தேசிய கட்டுப்பாட்டாளரின் ஒரு முயற்சியாகும். நாடு முழுவதும் திறன் மேம்பாட்டிற்கான உயர் தரங்களை நிறுவுவதற்கும் பராமரிப்பதற்கும் நாங்கள் கடமைப்பட்டுள்ளோம்.", description2: "இந்த தளம் தேசிய திறன் தகுதிகள் கட்டமைப்பு (NSQF) உடன் நேரடியாக ஒருங்கிணைந்து ஒவ்வொரு பரிந்துரையும் நம்பகமானதாகவும், அங்கீகரிக்கப்பட்டதாகவும், உங்கள் தொழிலுக்கு மதிப்புமிக்கதாகவும் இருப்பதை உறுதி செய்கிறது." }, technology: { title: "தொழில்நுட்பம்", description1: "இந்த தளம் அதிநவீன செயற்கை நுண்ணறிவால் இயக்கப்படுகிறது. உங்கள் கல்விப் பின்னணி, தற்போதுள்ள திறன்கள் மற்றும் தொழில் இலக்குகள் உள்ளிட்ட உங்கள் தனித்துவமான சுயவிவரத்தை பகுப்பாய்வு செய்ய நாங்கள் மேம்பட்ட AI மாதிரிகளைப் பயன்படுத்துகிறோம்.", description2: "எங்கள் AI பரிந்துரை இயந்திரம் உங்கள் சுயவிவரத்தை NCVET-அங்கீகரிக்கப்பட்ட தகுதிகள் மற்றும் நிகழ்நேர தொழிலாளர் சந்தைத் தரவுகளின் பரந்த தரவுத்தளத்துடன் ஒப்பிட்டு உங்களுக்காக ஒரு தனிப்பயனாக்கப்பட்ட கற்றல் பயணத்தை உருவாக்குகிறது." } },
    features: { title: "திறன் நேவிகேটার AI ஐ ஏன் தேர்வு செய்ய வேண்டும்?", subtitle: "உங்கள் தொழில் பயணத்தை அதிநவீன தொழில்நுட்பம் மற்றும் அரசாங்கத்தால் அங்கீகரிக்கப்பட்ட தரங்களுடன் மேம்படுத்துவதற்காக வடிவமைக்கப்பட்ட ஒரு விரிவான தளம்.", aiPowered: { title: "AI-இயங்கும் பரிந்துரைகள்", description: "எங்கள் ஸ்மார்ட் AI உங்கள் பின்னணி மற்றும் இலக்குகளைப் புரிந்துகொண்டு, AI/ML-இயங்கும் கற்பவர் சுயவிவரம் மற்றும் பரிந்துரை இயந்திரத்தின் அடிப்படையில் உங்களுக்காக ஒரு தனித்துவமான கற்றல் பாதையை உருவாக்குகிறது." }, govRecognized: { title: "அரசாங்கத்தால் அங்கீகரிக்கப்பட்ட பாதைகள்", description: "எங்கள் பரிந்துரைக்கப்பட்ட அனைத்து படிப்புகளும் தேசிய தரநிலைகளுடன் (NCVET & NSQF) ஒத்துப்போகின்றன, பயிற்சித் திட்டங்களுடன் நேரடி ஒருங்கிணைப்புடன் முக்கியமான தகுதிகளுக்கு." }, clearDashboard: { title: "தெளிவான தொழில் டாஷ்போர்டு", description: "கற்பவர்கள், பயிற்சியாளர்கள் மற்றும் கொள்கை வகுப்பாளர்களுக்கான எளிய, பயன்படுத்த எளிதான தொழில் வழிகாட்டுதல் டாஷ்போர்டில் உங்கள் முன்னேற்றத்தைக் கண்காணித்து தொழில் விருப்பங்களை ஆராயுங்கள்." }, jobInsights: { title: "நிகழ்நேர வேலை நுண்ணறிவு", description: "தொழிலாளர் சந்தை நுண்ணறிவுக்கான நிகழ்நேர வரைபடத்துடன் உங்கள் திறன்களைத் தேவையில் உள்ளவற்றுடன் நாங்கள் இணைக்கிறோம், தொழில் சீரமைப்பை உறுதி செய்கிறோம்." }, multilingual: { title: "உங்கள் மொழியில் கற்றல்", description: "பல மொழிகளில் வழிகாட்டுதலை அணுகவும். எங்கள் தளம் பல மொழி, உள்ளடக்கிய மற்றும் பல்வேறு கற்பவர் குழுக்களுக்கான அணுகக்கூடிய தீர்வாகும்." }, reliablePlatform: { title: "நம்பகமான மற்றும் வேகமான தளம்", description: "எங்கள் வலுவான, அளவிடக்கூடிய கட்டமைப்பு ஒரு மென்மையான மற்றும் நம்பகமான அனுபவத்தை உறுதி செய்கிறது, இந்தியா முழுவதும் மில்லியன் கணக்கான கற்பவர்களை ஆதரிக்கத் தயாராக உள்ளது." }, dataSafe: { title: "உங்கள் தரவு பாதுகாப்பானது", description: "உங்கள் தனிப்பட்ட தகவல்களை எல்லா நேரங்களிலும் பாதுகாக்க நாங்கள் கடுமையான தனியுரிமை மற்றும் பாதுகாப்பு விதிமுறைகளைப் பின்பற்றுகிறோம், முழு இணக்கத்தையும் உறுதி செய்கிறோம்." } },
    contactPage: { title: "தொடர்பு கொள்ளுங்கள்", subtitle: "நாங்கள் உதவ இங்கே இருக்கிறோம். பின்வரும் சேனல்கள் மூலம் எங்களைத் தொடர்பு கொள்ளவும்.", addressTitle: "எங்கள் முகவரி", address: "தேசிய தொழிற்கல்வி மற்றும் பயிற்சி கவுன்சில் (NCVET)<br>கௌஷல் பவன், பி-2, பூசா சாலை, கரோல் பாக்,<br>புது தில்லி – 110005, இந்தியா", phoneTitle: "தொலைபேசி எண்", phone: "+91 8328605892", emailTitle: "மின்னஞ்சல் முகவரி", email: "shaikhydumiya1127@gmail.com", note: "இந்த பயன்பாடு தொடர்பான விசாரணைகளுக்கு, மேலே வழங்கப்பட்ட தொடர்பு விவரங்களைப் பயன்படுத்தவும்." },
    privacyPolicy: { title: "தனியுரிமைக் கொள்கை", lastUpdated: "கடைசியாகப் புதுப்பிக்கப்பட்டது: ஆகஸ்ட் 1, 2024", introduction: { title: "அறிமுகம்", content: "<p>NCVET திறன் நேவிகேটার AI-க்கு வரவேற்கிறோம். உங்கள் தனியுரிமையைப் பாதுகாக்க நாங்கள் கடமைப்பட்டுள்ளோம். நீங்கள் எங்கள் பயன்பாட்டைப் பயன்படுத்தும்போது உங்கள் தகவலை நாங்கள் எவ்வாறு சேகரிக்கிறோம், பயன்படுத்துகிறோம், வெளிப்படுத்துகிறோம் மற்றும் பாதுகாக்கிறோம் என்பதை இந்தத் தனியுரிமைக் கொள்கை விளக்குகிறது. இந்தக் கொள்கையை கவனமாகப் படிக்கவும்.</p>" }, informationWeCollect: { title: "நாங்கள் சேகரிக்கும் தகவல்", content: "<p>நாங்கள் உங்களைப் பற்றிய தகவலை பல்வேறு வழிகளில் சேகரிக்கலாம். சேவையில் நாங்கள் சேகரிக்கக்கூடிய தகவல்களில் பின்வருவன அடங்கும்:</p><ul><li><strong>தனிப்பட்ட தரவு:</strong> சேவையில் பதிவுசெய்யும்போது நீங்கள் எங்களுக்கு স্বেচ্ছையாக வழங்கும் உங்கள் பெயர் மற்றும் மின்னஞ்சல் முகவரி போன்ற தனிப்பட்ட முறையில் அடையாளம் காணக்கூடிய தகவல்.</li><li><strong>கற்பவர் சுயவிவரத் தரவு:</strong> உங்கள் கல்விப் பின்னணி, முந்தைய திறன்கள், தொழில் आकांक्षाக்கள் மற்றும் கற்றல் விருப்பத்தேர்வுகள் போன்ற திறன் பாதைகளை உருவாக்க நீங்கள் வழங்கும் தகவல்.</li><li><strong>பயன்பாட்டுத் தரவு:</strong> சேவைக்கான உங்கள் அணுகல் மற்றும் பயன்பாடு பற்றிய தகவலை நாங்கள் தானாகவே சேகரிக்கலாம், ஆனால் இந்தத் தரவு அநாமதேயமானது மற்றும் சேவை மேம்பாட்டிற்கு மட்டுமே பயன்படுத்தப்படுகிறது.</li></ul>" }, howWeUseInfo: { title: "உங்கள் தகவலை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்", content: "<p>உங்களைப் பற்றிய துல்லியமான தகவலைக் கொண்டிருப்பது, உங்களுக்கு ஒரு மென்மையான, திறமையான மற்றும் தனிப்பயனாக்கப்பட்ட அனுபவத்தை வழங்க எங்களை அனுமதிக்கிறது. குறிப்பாக, சேவை மூலம் உங்களைப் பற்றி சேகரிக்கப்பட்ட தகவலை நாங்கள் பயன்படுத்தலாம்:</p><ul><li>உங்கள் கணக்கை உருவாக்கி நிர்வகிக்க.</li><li>தனிப்பயனாக்கப்பட்ட தொழிற்பயிற்சி பாதைகளை உருவாக்க.</li><li>சேவையின் செயல்திறன் மற்றும் செயல்பாட்டை மேம்படுத்த.</li><li>உங்கள் அனுபவத்தை மேம்படுத்த பயன்பாடு மற்றும் போக்குகளைக் கண்காணிக்கவும் பகுப்பாய்வு செய்யவும்.</li><li>பயனர் விசாரணைகளுக்குப் பதிலளிக்கவும் மற்றும் ஆதரவை வழங்கவும்.</li></ul>" }, dataSharing: { title: "தரவுப் பகிர்வு மற்றும் வெளிப்படுத்தல்", content: "<p>உங்கள் தனிப்பட்ட முறையில் அடையாளம் காணக்கூடிய தகவலை நாங்கள் வெளி தரப்பினருக்கு விற்கவோ, வர்த்தகம் செய்யவோ அல்லது வேறுவிதமாக மாற்றவோ மாட்டோம். எங்கள் விண்ணப்பத்தை இயக்குவதில் எங்களுக்கு உதவும் நம்பகமான மூன்றாம் தரப்பினர் இதில் அடங்காது, அந்தத் தரப்பினர் இந்தத் தகவலை ரகசியமாக வைத்திருக்க ஒப்புக்கொண்டால். சட்டம், எங்கள் தளக் கொள்கைகளைச் செயல்படுத்த, அல்லது எங்களுடைய அல்லது மற்றவர்களின் உரிமைகள், சொத்து அல்லது பாதுகாப்பைப் பாதுகாக்க வெளியீடு பொருத்தமானது என்று நாங்கள் நம்பும்போது உங்கள் தகவலை நாங்கள் வெளியிடலாம். அநாமதேய, மொத்தத் தரவு ஆராய்ச்சி மற்றும் கொள்கை உருவாக்கும் நோக்கங்களுக்காகப் பயன்படுத்தப்படலாம்.</p>" }, dataSecurity: { title: "தரவுப் பாதுகாப்பு", content: "<p>உங்கள் தனிப்பட்ட தகவலைப் பாதுகாக்க நாங்கள் நிர்வாக, தொழில்நுட்ப மற்றும் உடல் பாதுகாப்பு நடவடிக்கைகளைப் பயன்படுத்துகிறோம். நீங்கள் எங்களுக்கு வழங்கும் தனிப்பட்ட தகவலைப் பாதுகாக்க நாங்கள் நியாயமான நடவடிக்கைகளை எடுத்திருந்தாலும், எங்கள் முயற்சிகள் இருந்தபோதிலும், எந்தப் பாதுகாப்பு நடவடிக்கைகளும் சரியானவை அல்லது ஊடுருவ முடியாதவை அல்ல, மேலும் தரவுப் பரிமாற்றத்தின் எந்த முறையும் எந்தவொரு இடைமறிப்பு அல்லது பிற வகை தவறான பயன்பாட்டிற்கு எதிராக உத்தரவாதம் அளிக்கப்படாது என்பதை நினைவில் கொள்ளவும்.</p>" }, yourRights: { title: "உங்கள் உரிமைகள்", content: "<p>உங்களிடம் உள்ள தகவலை அணுக, புதுப்பிக்க அல்லது நீக்க உங்களுக்கு உரிமை உண்டு. இது உலாவி சேமிப்பகத்தைப் பயன்படுத்தும் ஒரு செயல்விளக்கப் பயன்பாடு என்பதால், இந்தத் தளத்திற்கான உங்கள் உலாவியின் உள்ளூர் சேமிப்பகத்தை அழிப்பதன் மூலம் உங்கள் தரவை நீங்கள் அழிக்கலாம். ஒரு முழு அளவிலான பயன்பாட்டில், இந்த உரிமைகளை நேரடியாகப் பயன்படுத்த கணக்கு மேலாண்மைக் கருவிகள் உங்களிடம் இருக்கும்.</p>" }, changes: { title: "இந்தத் தனியுரிமைக் கொள்கையில் மாற்றங்கள்", content: "<p>நாங்கள் அவ்வப்போது இந்தத் தனியுரிமைக் கொள்கையைப் புதுப்பிக்கலாம். இந்தப் பக்கத்தில் புதிய தனியுரிமைக் கொள்கையை இடுகையிடுவதன் மூலம் எந்த மாற்றங்களையும் நாங்கள் உங்களுக்குத் தெரிவிப்போம். எந்த மாற்றங்களுக்கும் இந்தத் தனியுரிமைக் கொள்கையை அவ்வப்போது மதிப்பாய்வு செய்ய அறிவுறுத்தப்படுகிறீர்கள்.</p>" }, contact: { title: "தொடர்பு கொள்ளுங்கள்", content: "<p>இந்தத் தனியுரிமைக் கொள்கையைப் பற்றி உங்களுக்கு ஏதேனும் கேள்விகள் இருந்தால், தயவுசெய்து NCVET-ஐ அதன் அதிகாரப்பூர்வ அரசாங்க சேனல்கள் மூலம் தொடர்பு கொள்ளவும். இந்தப் பயன்பாடு ஒரு முன்மாதிரி மற்றும் பிரத்யேக ஆதரவுக் குழு இல்லை.</p>" } },
    constants: {
        academic_backgrounds: { 'Below 8th Standard': '8 ஆம் வகுப்புக்கு கீழ்', '8th Pass': '8 ஆம் வகுப்பு தேர்ச்சி', '10th Pass': '10 ஆம் வகுப்பு தேர்ச்சி', '12th Pass / Intermediate': '12 ஆம் வகுப்பு தேர்ச்சி / இடைநிலை', 'ITI Certificate': 'ஐடிஐ சான்றிதழ்', 'Polytechnic Diploma': 'பாலிடெக்னிக் டிப்ளமோ', 'Vocational Training Certificate': 'தொழிற்பயிற்சி சான்றிதழ்', 'Undergraduate (Pursuing)': 'இளங்கலை (படித்துக் கொண்டிருப்பவர்)', 'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'பட்டப்படிப்பு', 'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'முதுகலை பட்டம்', 'Doctorate (PhD)': 'முனைவர் பட்டம் (பிஎச்.டி)' },
        learning_pace_options: { 'Full-time': 'முழுநேரம்', 'Part-time': 'பகுதிநேரம்', 'Weekend only': 'வார இறுதி மட்டும்', 'Self-paced (Online)': 'சுய-வேகம் (ஆன்லைன்)', 'Flexible (Hybrid)': 'நெகிழ்வான (கலப்பின)' },
        common_skills: { 'Programming (Java, Python, C, etc.)': 'புரோகிராமிங் (ஜாவா, பைதான், சி, போன்றவை)', 'Web Development (HTML, CSS, PHP, JS)': 'இணைய மேம்பாடு (HTML, CSS, PHP, JS)', 'Data Science / AI / ML': 'தரவு அறிவியல் / AI / ML', 'Database Management (SQL, MongoDB)': 'தரவுத்தள மேலாண்மை (SQL, MongoDB)', 'Cloud Computing (AWS, IBM Watson, Azure)': 'கிளவுட் கம்ப்யூட்டிங் (AWS, IBM வாட்சன், அஸூர்)', 'Automation (UiPath, RPA)': 'ஆட்டோமேஷன் (UiPath, RPA)', Cybersecurity: 'சைபர் பாதுகாப்பு', 'Mobile Development': 'மொபைல் மேம்பாடு', 'UI/UX Design': 'UI/UX வடிவமைப்பு', 'Graphic Design': 'கிராஃபிக் வடிவமைப்பு', 'Video Editing': 'வீடியோ எடிட்டிங்', 'Problem-Solving': 'சிக்கல் தீர்க்கும் திறன்', 'Data Analysis': 'தரவு பகுப்பாய்வு', 'Critical Thinking': 'விமர்சன சிந்தனை', 'Research & Development': 'ஆராய்ச்சி மற்றும் மேம்பாடு', 'Project Management': 'திட்ட மேலாண்மை', 'Team Collaboration': 'குழு ஒத்துழைப்பு', 'Leadership / Coordination': 'தலைமைத்துவம் / ஒருங்கிணைப்பு', 'Entrepreneurship / Business Planning': 'தொழில்முனைவு / வணிக திட்டமிடல்', 'Marketing & Strategy': 'சந்தைப்படுத்தல் மற்றும் உத்தி', 'Digital Marketing': 'டிஜிட்டல் மார்க்கெட்டிங்', Sales: 'விற்பனை', Accounting: 'கணக்கியல்', 'Customer Service': 'வாடிக்கையாளர் சேவை', 'Innovation & Idea Generation': 'புதுமை மற்றும் யோசனை உருவாக்கம்', 'Content Writing / Presentation': 'உள்ளடக்கம் எழுதுதல் / விளக்கக்காட்சி', 'Design Thinking': 'வடிவமைப்பு சிந்தனை', 'Public Speaking': 'பொதுப் பேச்சு', 'Communication Skills': 'தகவல்தொடர்பு திறன்கள்', 'Time Management': 'நேர மேலாண்மை', Adaptability: 'ஏற்புத்திறன்', 'Decision Making': 'முடிவெடுக்கும் திறன்', Networking: 'நெட்வொர்க்கிங்', 'Spoken English': 'பேச்சு ஆங்கிலம்', 'IBM Watson': 'ஐபிஎம் வாட்சன்', 'UiPath (RPA)': 'யுஐபாத் (ஆர்பிஏ)', 'Git/GitHub': 'கிட்/கிட்ஹப்', 'MS Office / Google Workspace': 'எம்எஸ் ஆஃபீஸ் / கூகுள் வொர்க்ஸ்பேஸ்', 'Data Entry': 'தரவு உள்ளீடு', 'Electrical Wiring': 'மின்சார வயரிங்', Plumbing: 'பிளம்பிங்', Welding: 'வெல்டிங்', Carpentry: 'தச்சு வேலை', 'Automotive Repair': 'தானியங்கி பழுது', 'Cooking & Baking': 'சமையல் மற்றும் பேக்கிங்', 'Healthcare Assistance': 'சுகாதார உதவி', 'Mechanical Drawing': 'இயந்திர வரைதல்' },
        career_aspirations: { 'Technologist / Engineer': 'தொழில்நுட்பவியலாளர் / பொறியாளர்', 'Data Analyst / AI Specialist': 'தரவு ஆய்வாளர் / AI நிபுணர்', 'Doctor / Medical Professional': 'மருத்துவர் / மருத்துவ நிபுணர்', 'Government / Public Sector': 'அரசு / பொதுத் துறை', 'Researcher / Scientist': 'ஆராய்ச்சியாளர் / விஞ்ஞானி', 'Innovator / Problem Solver': 'புத்தாக்குநர் / சிக்கல் தீர்ப்பவர்', 'Entrepreneur / Startup Founder': 'தொழில்முனைவோர் / ஸ்டார்ட்அப் நிறுவனர்', 'Business Leader / Manager': 'வணிகத் தலைவர் / மேலாளர்', 'Social Entrepreneur / Change Maker': 'சமூக தொழில்முனைவோர் / மாற்றத்தை உருவாக்குபவர்', 'Educator / Mentor': 'கல்வியாளர் / வழிகாட்டி', 'Creative Designer / Innovator': 'படைப்பாற்றல் வடிவமைப்பாளர் / புத்தாக்குநர்', 'Global Professional / International Career': 'உலகளாவிய நிபுணர் / சர்வதேச தொழில்', 'Full Stack Developer': 'முழு அடுக்கு டெவலப்பர்', 'Cloud Computing Engineer': 'கிளவுட் கம்ப்யூட்டிங் பொறியாளர்', 'Cybersecurity Analyst': 'சைபர் பாதுகாப்பு ஆய்வாளர்', 'Digital Marketing Manager': 'டிஜிட்டাল மார்க்கெட்டிங் மேலாளர்', 'Logistics and Supply Chain Manager': 'தளவாடங்கள் மற்றும் விநியோகச் சங்கிலி மேலாளர்', 'Solar Panel Technician': 'சூரிய தகடு தொழில்நுட்பவியலாளர்', 'EV Charging Station Technician': 'மின்சார வாகன சார்ஜிங் நிலைய தொழில்நுட்பவியலாளர்', 'Organic Farming Specialist': 'இயற்கை விவசாய நிபுணர்', 'Drone Operator': 'ட்ரோன் ஆபரேட்டர்', '3D Printing Technician': '3டி பிரிண்டிங் தொழில்நுட்பவியலாளர்', 'AR/VR Developer': 'ஏஆர்/விஆர் டெவலப்பர்', 'Robotics Engineer': 'ரோபாட்டிக்ஸ் பொறியாளர்', 'Certified Nursing Assistant (CNA)': 'சான்றளிக்கப்பட்ட நர்சிங் உதவியாளர் (சிஎன்ஏ)', 'Medical Lab Technician': 'மருத்துவ ஆய்வக தொழில்நுட்பவியலாளர்' },
        competitive_exams: { GATE: 'கேட் (பொறியியலில் பட்டதாரி திறனாய்வுத் தேர்வு)', NEET_PG: 'நீட்-பிஜி (முதுகலை)', UPSC_CSE: 'யுபிஎஸ்சி சிவில் சர்வீசஸ் தேர்வு', CAT: 'கேட் (பொது நுழைவுத் தேர்வு)', SSC_CGL: 'எஸ்எஸ்சி சிஜிஎல் (ஒருங்கிணைந்த பட்டதாரி நிலை)', IBPS_PO: 'ஐபிபிஎஸ் பிஓ (பயிற்சி அதிகாரி)', UGC_NET: 'யுஜிசி நெட் (தேசிய தகுதித் தேர்வு)', JEE: 'ஜேஇஇ மெயின் & அட்வான்ஸ்டு' }
    }
  },
  te: { // Telugu
    common: { back: 'వెనుకకు', next: 'తరువాత', backAria: 'వెనుకకు వెళ్ళు' },
    header: { about: 'గురించి', welcome: 'స్వాగతం', logout: 'లాగ్ అవుట్' },
    footer: { about: 'మా గురించి', privacy: 'గోప్యతా విధానం', contact: 'సంప్రదించండి', copyright: '© {year} నేషనల్ కౌన్సిల్ ఫర్ వొకేషనల్ ఎడ్యుకేషన్ అండ్ ట్రైనింగ్ (NCVET). సర్వహక్కులు ప్రత్యేకించబడ్డాయి.', poweredBy: 'నైపుణ్యం కలిగిన భారతదేశం కోసం AI ద్వారా ఆధారితం.' },
    login: { welcomeBack: "తిరిగి వచ్చినందుకు స్వాగతం!", signInToContinue: "మీ ప్రయాణాన్ని కొనసాగించడానికి సైన్ ఇన్ చేయండి.", emailAddress: "ఇమెయిల్ చిరునామా", password: "పాస్వర్డ్", forgotPassword: "పాస్వర్డ్ మర్చిపోయారా?", signIn: "సైన్ ఇన్ చేయండి", signingIn: "సైన్ ఇన్ చేస్తోంది...", noAccount: "ఖాతా లేదా?", signUp: "నమోదు చేసుకోండి", error: { invalidCredentials: "తప్పుడు ఇమెయిల్ లేదా పాస్వర్డ్. మళ్ళీ ప్రయత్నించండి.", unknown: "తెలియని లోపం సంభవించింది. దయచేసి మళ్ళీ ప్రయత్నించండి." } },
    register: { title: "మీ ఖాతాను సృష్టించండి", subtitle: "ఈరోజే మీ వ్యక్తిగతీకరించిన నైపుణ్య ప్రయాణాన్ని ప్రారంభించండి.", name: { label: "పూర్తి పేరు", placeholder: "ఉదా., ప్రియా శర్మ" }, email: { label: "ఇమెయిల్ చిరునామా" }, password: { label: "పాస్వర్డ్" }, createAccount: "ఖాతాను సృష్టించండి", creatingAccount: "ఖాతాను సృష్టిస్తోంది...", alreadyHaveAccount: "ఇప్పటికే ఖాతా ఉందా?", signIn: "సైన్ ఇన్ చేయండి", backToLogin: "లాగిన్‌కు తిరిగి వెళ్ళు", backToLoginAria: "లాగిన్‌కు తిరిగి వెళ్ళు", error: { allFieldsRequired: "అన్ని ఫీల్డ్‌లు అవసరం.", unknown: "నమోదు సమయంలో తెలియని లోపం సంభవించింది.", passwordTooShort: 'పాస్వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.', emailExists: 'ఈ ఇమెయిల్ చిరునామాతో ఖాతా ఇప్పటికే ఉంది.', passwordInUse: 'ఈ పాస్వర్డ్ ఇప్పటికే మరొక ఖాతా ద్వారా ఉపయోగించబడుతోంది. దయచేసి వేరేదాన్ని ఎంచుకోండి.' }, alert: { success: "నమోదు విజయవంతమైంది! దయచేసి లాగిన్ చేయండి." } },
    forgotPassword: { title: "మీ పాస్వర్డ్ను రీసెట్ చేయండి", subtitle: "మీ ఇమెయిల్‌ను నమోదు చేయండి మరియు మీ ఖాతాలోకి తిరిగి రావడానికి మేము మీకు ఒక లింక్‌ను పంపుతాము.", email: { label: "ఇమెయిల్ చిరునామా" }, sendResetLink: "రీసెట్ లింక్‌ను పంపండి", rememberPassword: "మీ పాస్వర్డ్ గుర్తుందా?", signIn: "సైన్ ఇన్ చేయండి", backToLogin: "లాగిన్‌కు తిరిగి వెళ్ళు", backToLoginAria: "లాగిన్‌కు తిరిగి వెళ్ళు", submitted: { title: "మీ ఇమెయిల్‌ను తనిఖీ చేయండి", subtitle: "{email}తో ఖాతా ఉంటే, మీ పాస్వర్డ్ను రీసెట్ చేయడానికి మేము సూచనలను పంపాము.", backToSignIn: "సైన్ ఇన్ చేయడానికి తిరిగి వెళ్ళు" } },
    dashboard: { welcome: "తిరిగి వచ్చినందుకు స్వాగతం", subtitle: "మీరు సేవ్ చేసిన నైపుణ్య మార్గాలను కింద చూడవచ్చు లేదా క్రొత్తదాన్ని సృష్టించవచ్చు.", generateNew: "క్రొత్త నైపుణ్య మార్గాన్ని సృష్టించండి", savedOn: "సేవ్ చేయబడింది", viewPathway: "మార్గం చూడండి", noSavedPathways: { title: "సేవ్ చేసిన మార్గాలు లేవు", subtitle: "క్రొత్త నైపుణ్య మార్గాన్ని సృష్టించడం ద్వారా ప్రారంభించండి." } },
    form: { title: "మీ నైపుణ్య మార్గాన్ని కనుగొనండి", subtitle: "మీ వ్యక్తిగతీకరించిన కెరీర్ ప్రణాళికను పొందడానికి కింద ఉన్న దశలను పూర్తి చేయండి.", step1: { title: "మీ నేపథ్యం", academicBackground: { label: "అత్యధిక విద్యా నేపథ్యం" }, priorSkills: { label: "మునుపటి నైపుణ్యాలు లేదా అనుభవం (వర్తించేవన్నీ ఎంచుకోండి)", helper: "మీకు ఇప్పటికే ఉన్న ఏవైనా నైపుణ్యాలను ఎంచుకోండి. ఇది మీ మార్గాన్ని అనుకూలీకరించడానికి మాకు సహాయపడుతుంది." } }, step2: { title: "మీ లక్ష్యాలు", careerAspiration: { label: "కెరీర్ ఆకాంక్ష / లక్ష్యం", placeholder: "ఉదా., సోలార్ ప్యానెల్ టెక్నీషియన్, AI/ML నిపుణుడు" }, preferredLocation: { label: "ఇష్టపడే పని ప్రదేశం (నగరం/రాష్ట్రం)", placeholder: "ఉదా., బెంగళూరు, కర్ణాటక" }, learningPace: { label: "ఇష్టపడే అభ్యాస వేగం" }, preferredLanguage: { label: "మార్గం కోసం ఇష్టపడే భాష" }, generatePathway: "మార్గం సృష్టించండి" } },
    pathwayGraph: { title: "మీ అభ్యాస రోడ్‌మ్యాప్" },
    pathwayDisplay: { share: 'మార్గం పంచుకోండి', linkCopied: 'లింక్ కాపీ చేయబడింది!', shareFailed: 'భాగస్వామ్యం విఫలమైంది', timelineTitle: 'మీ అభ్యాస కాలక్రమం', duration: 'వ్యవధి:', nsqfLevel: 'NSQF స్థాయి:', watchSuggested: 'సూచించిన ట్యుటోరియల్ చూడండి', findTutorials: 'YouTubeలో ట్యుటోరియల్స్ కనుగొనండి', searchPrepared: "మేము మీ కోసం సంబంధిత వీడియోల కోసం శోధనను సిద్ధం చేసాము.", backToForm: 'ఫారమ్‌కు తిరిగి వెళ్ళు', savePathway: 'మార్గం సేవ్ చేయండి', prepareForExams: 'పరీక్షలకు సిద్ధం కండి', provideFeedback: 'అభిప్రాయం ఇవ్వండి', downloadPathway: 'మార్గం డౌన్‌లోడ్ చేయండి' },
    marketInsights: { title: 'కెరీర్ మార్కెట్ అంతర్దృష్టులు', jobDemand: 'ఉద్యోగ డిమాండ్', salary: 'జీతం అంచనా (ప్రవేశ-స్థాయి)', hiringCompanies: 'టాప్ నియామక కంపెనీలు', keySkills: 'డిమాండ్‌లో ఉన్న కీలక నైపుణ్యాలు' },
    careerGuidance: { title: 'వ్యక్తిగతీకరించిన కెరీర్ మార్గదర్శకత్వం', companiesAndSectors: 'టాప్ కంపెనీలు & రంగాలు', topPick: 'టాప్ పిక్', recommendedCompany: 'మీ సిఫార్సు చేసిన కంపెనీ', roadmap: '{companyName}లో ఉద్యోగం పొందడానికి మీ రోడ్‌మ్యాప్', skillsToHighlight: 'హైలైట్ చేయవలసిన నైపుణ్యాలు', interviewPrep: 'ఇంటర్వ్యూ తయారీ', networkingTips: 'నెట్‌వర్కింగ్ చిట్కాలు' },
    chat: { title: 'AI నైపుణ్య సహాయకుడు', initialMessage: 'నమస్కారం! ఈ రోజు మీ కెరీర్ మరియు నైపుణ్య ప్రయాణంలో నేను మీకు ఎలా సహాయపడగలను?', unavailable: 'క్షమించండి, చాట్ అసిస్టెంట్ ప్రస్తుతం అందుబాటులో లేదు.', errorMessage: 'క్షమించండి, నేను లోపం ఎదుర్కొన్నాను. దయచేసి మళ్ళీ ప్రయత్నించండి.', placeholder: 'ప్రశ్న అడగండి...' },
    examHub: { title: 'పరీక్ష తయారీ హబ్', downloadPlan: 'ప్రణాళికను డౌన్‌లోడ్ చేయండి', backToPathway: 'మార్గానికి తిరిగి వెళ్ళు', generating: 'మీ అధ్యయన ప్రణాళికను రూపొందిస్తోంది...', showPriorityOnly: 'ప్రాధాన్యత ఉన్నవి మాత్రమే చూపించు', noPriorityItems: 'మీరు ఏ అంశాన్ని కూడా అధిక ప్రాధాన్యతగా గుర్తించలేదు.', error: { title: 'లోపం', failed: 'అధ్యయన ప్రణాళికను రూపొందించడంలో విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.', selectExam: 'అధ్యయన ప్రణాళికను పొందడానికి దయచేసి ఒక పరీక్షను ఎంచుకోండి.' }, plan: { title: '{examName} కోసం అధ్యయన ప్రణాళిక', roadmap: 'అధ్యయన రోడ్‌మ్యాప్', books: 'సిఫార్సు చేసిన పుస్తకాలు', courses: 'ఆన్‌లైన్ కోర్సులు', questions: 'ప్రాక్టీస్ ప్రశ్నలు', question: 'ప్రశ్న {index}', answer: 'జవాబు:' }, form: { title: 'పరీక్షను ఎంచుకోండి', subtitle: 'వ్యక్తిగతీకరించిన అధ్యయన ప్రణాళికను రూపొందించడానికి పోటీ పరీక్షను ఎంచుకోండి.', label: 'పోటీ పరీక్షను ఎంచుకోండి', button: 'అధ్యయన ప్రణాళికను రూపొందించండి' } },
    feedbackModal: { title: 'అభిప్రాయం ఇవ్వండి', close: 'మోడల్‌ను మూసివేయండి', subtitle: 'ఈ మార్గం సిఫార్సు ఎలా ఉంది? మీ అంతర్దృష్టులు మా AIని మెరుగుపరచడంలో సహాయపడతాయి.', placeholder: "ఉదా., దశలు చాలా స్పష్టంగా ఉన్నాయి, కానీ నేను ప్రారంభకులకు మరిన్ని వనరులను చూడాలనుకుంటున్నాను...", cancel: 'రద్దు చేయండి', submit: 'అభిప్రాయాన్ని సమర్పించండి', submitted: { title: 'ధన్యవాదాలు!', message: 'మీ అభిప్రాయం స్వీకరించబడింది. మమ్మల్ని మెరుగుపరచడంలో సహాయపడినందుకు మేము మిమ్మల్ని అభినందిస్తున్నాము.' } },
    app: { loading: { title: "మీ వ్యక్తిగతీకరించిన మార్గాన్ని రూపొందిస్తోంది...", subtitle: "మా AI మీ కోసం సరైన నైపుణ్య ప్రయాణాన్ని సృష్టించడానికి మీ ప్రొఫైల్‌ను విశ్లేషిస్తోంది." }, error: { pathwayGeneration: "మార్గం రూపొందించడంలో విఫలమైంది. దయచేసి మీ API కీని తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.", userNotFound: "వినియోగదారు కనుగొనబడలేదు." }, alert: { pathwaySaved: "మార్గం విజయవంతంగా సేవ్ చేయబడింది!", pathwaySaveFailed: "మార్గం సేవ్ చేయలేకపోయాము. దయచేసి మళ్ళీ ప్రయత్నించండి." } },
    about: { title: "NCVET స్కిల్ నావిగేటర్ AI గురించి", subtitle: "భారతదేశంలో విజయవంతమైన వృత్తి కెరీర్‌కు మీ వ్యక్తిగతీకరించిన మార్గదర్శి.", mission: { title: "మా లక్ష్యం", description: "భారతదేశంలోని ప్రతి అభ్యాసకుడికి వారి ఆకాంక్షలు మరియు కార్మిక మార్కెట్ యొక్క నిజ-సమయ డిమాండ్‌లకు అనుగుణంగా వృత్తి నైపుణ్యాలను సంపాదించడానికి స్పష్టమైన, వ్యక్తిగతీకరించిన మరియు అనుకూల మార్గంతో సాధికారత కల్పించడం మా లక్ష్యం. విద్య మరియు ఉపాధి మధ్య అంతరాన్ని తగ్గించి, అభివృద్ధి చెందుతున్న భారతదేశం కోసం నైపుణ్యం కలిగిన శ్రామిక శక్తిని సృష్టించడం మా లక్ష్యం." }, whoWeAre: { title: "మేము ఎవరు", description1: "స్కిల్ నావిగేటర్ AI అనేది <strong>నేషనల్ కౌన్సిల్ ఫర్ వొకేషనల్ ఎడ్యుకేషన్ అండ్ ట్రైనింగ్ (NCVET)</strong>, భారతదేశంలో వృత్తి విద్య కోసం జాతీయ నియంత్రణ సంస్థ యొక్క ఒక చొరవ. దేశవ్యాప్తంగా నైపుణ్యాభివృద్ధికి ఉన్నత ప్రమాణాలను స్థాపించడానికి మరియు నిర్వహించడానికి మేము కట్టుబడి ఉన్నాము.", description2: "ప్రతి సిఫార్సు విశ్వసనీయమైనది, గుర్తింపు పొందింది మరియు మీ కెరీర్‌కు విలువైనదని నిర్ధారించడానికి ఈ ప్లాట్‌ఫారమ్ నేషనల్ స్కిల్స్ క్వాలిఫికేషన్స్ ఫ్రేమ్‌వర్క్ (NSQF)తో నేరుగా అనుసంధానించబడుతుంది." }, technology: { title: "సాంకేతికత", description1: "ఈ ప్లాట్‌ఫారమ్ అత్యాధునిక కృత్రిమ మేధస్సు ద్వారా ఆధారితం. మీ విద్యా నేపథ్యం, ఉన్న నైపుణ్యాలు మరియు కెరీర్ లక్ష్యాలతో సహా మీ ప్రత్యేక ప్రొఫైల్‌ను విశ్లేషించడానికి మేము అధునాతన AI నమూనాలను ఉపయోగిస్తాము.", description2: "మా AI సిఫార్సు ఇంజిన్ మీ ప్రొఫైల్‌ను NCVET-ఆమోదించబడిన అర్హతలు మరియు నిజ-సమయ కార్మిక మార్కెట్ డేటా యొక్క విస్తారమైన డేటాబేస్‌కు వ్యతిరేకంగా మ్యాప్ చేసి మీ కోసం మాత్రమే అనుకూలీకరించిన అభ్యాస ప్రయాణాన్ని సృష్టిస్తుంది." } },
    features: { title: "స్కిల్ నావిగేటర్ AIని ఎందుకు ఎంచుకోవాలి?", subtitle: "మీ కెరీర్ ప్రయాణాన్ని అత్యాధునిక సాంకేతికత మరియు ప్రభుత్వం-గుర్తించిన ప్రమాణాలతో సాధికారత కల్పించడానికి రూపొందించిన ఒక సమగ్ర ప్లాట్‌ఫారమ్.", aiPowered: { title: "AI-ఆధారిత సిఫార్సులు", description: "మా స్మార్ట్ AI మీ నేపథ్యం మరియు లక్ష్యాలను అర్థం చేసుకుని, AI/ML-ఆధారిత అభ్యాసకుల ప్రొఫైలింగ్ మరియు సిఫార్సు ఇంజిన్ ఆధారంగా మీ కోసం మాత్రమే ఒక ప్రత్యేక అభ్యాస మార్గాన్ని సృష్టిస్తుంది." }, govRecognized: { title: "ప్రభుత్వం గుర్తించిన మార్గాలు", description: "మా సిఫార్సు చేసిన అన్ని కోర్సులు జాతీయ ప్రమాణాలకు (NCVET & NSQF) అనుగుణంగా ఉంటాయి, శిక్షణా కార్యక్రమాలతో ప్రత్యక్ష అనుసంధానంతో ముఖ్యమైన అర్హతల కోసం." }, clearDashboard: { title: "స్పష్టమైన కెరీర్ డాష్‌బోర్డ్", description: "అభ్యాసకులు, శిక్షకులు మరియు విధాన రూపకర్తల కోసం సులభమైన, ఉపయోగించడానికి సులభమైన కెరీర్ మార్గదర్శక డాష్‌బోర్డ్‌లో మీ పురోగతిని ట్రాక్ చేయండి మరియు కెరీర్ ఎంపికలను అన్వేషించండి." }, jobInsights: { title: "నిజ-సమయ ఉద్యోగ అంతర్దృష్టులు", description: "పరిశ్రమ అనుసంధానాన్ని నిర్ధారిస్తూ, కార్మిక మార్కెట్ ఇంటెలిజెన్స్‌కు నిజ-సమయ మ్యాపింగ్‌తో మీ నైపుణ్యాలను డిమాండ్‌లో ఉన్నవాటికి మేము కనెక్ట్ చేస్తాము." }, multilingual: { title: "మీ భాషలో అభ్యాసం", description: "బహుళ భాషలలో మార్గదర్శకత్వాన్ని యాక్సెస్ చేయండి. మా ప్లాట్‌ఫారమ్ విభిన్న అభ్యాసకుల సమూహాల కోసం బహుభాషా, కలుపుకొని మరియు అందుబాటులో ఉండే పరిష్కారం." }, reliablePlatform: { title: "విశ్వసనీయమైన & వేగవంతమైన ప్లాట్‌ఫారమ్", description: "మా దృఢమైన, స్కేలబుల్ ఆర్కిటెక్చర్ ఒక సున్నితమైన మరియు నమ్మదగిన అనుభవాన్ని నిర్ధారిస్తుంది, భారతదేశం అంతటా లక్షలాది మంది అభ్యాసకులకు మద్దతు ఇవ్వడానికి సిద్ధంగా ఉంది." }, dataSafe: { title: "మీ డేటా సురక్షితం", description: "మీ వ్యక్తిగత సమాచారాన్ని అన్ని సమయాల్లో రక్షించడానికి మేము కఠినమైన గోప్యత మరియు భద్రతా నిబంధనలను అనుసరిస్తాము, పూర్తి అనుగుణతను నిర్ధారిస్తాము." } },
    contactPage: { title: "మమ్మల్ని సంప్రదించండి", subtitle: "మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము. కింది ఛానెల్‌ల ద్వారా మమ్మల్ని సంప్రదించండి.", addressTitle: "మా చిరునామా", address: "నేషనల్ కౌన్సిల్ ఫర్ వొకేషనల్ ఎడ్యుకేషన్ అండ్ ట్రైనింగ్ (NCVET)<br>కౌశల్ భవన్, B-2, పూసా రోడ్, కరోల్ బాగ్,<br>న్యూఢిల్లీ – 110005, భారతదేశం", phoneTitle: "ఫోన్ నంబర్", phone: "+91 8328605892", emailTitle: "ఇమెయిల్ చిరునామా", email: "shaikhydumiya1127@gmail.com", note: "ఈ అప్లికేషన్ గురించి విచారణల కోసం, దయచేసి పైన అందించిన సంప్రదింపు వివరాలను ఉపయోగించండి." },
    privacyPolicy: { title: "గోప్యతా విధానం", lastUpdated: "చివరిగా నవీకరించబడింది: ఆగష్టు 1, 2024", introduction: { title: "పరిచయం", content: "<p>NCVET స్కిల్ నావిగేటర్ AIకి స్వాగతం. మీ గోప్యతను కాపాడటానికి మేము కట్టుబడి ఉన్నాము. మీరు మా అప్లికేషన్‌ను ఉపయోగించినప్పుడు మీ సమాచారాన్ని మేము ఎలా సేకరిస్తాము, ఉపయోగిస్తాము, వెల్లడిస్తాము మరియు భద్రపరుస్తాము అని ఈ గోప్యతా విధానం వివరిస్తుంది. దయచేసి ఈ విధానాన్ని జాగ్రత్తగా చదవండి.</p>" }, informationWeCollect: { title: "మేము సేకరించే సమాచారం", content: "<p>మేము మీ గురించి వివిధ మార్గాల్లో సమాచారాన్ని సేకరించవచ్చు. సేవలో మేము సేకరించగల సమాచారంలో ఇవి ఉన్నాయి:</p><ul><li><strong>వ్యక్తిగత డేటా:</strong> మీరు సేవతో నమోదు చేసుకున్నప్పుడు స్వచ్ఛందంగా మాకు ఇచ్చే మీ పేరు మరియు ఇమెయిల్ చిరునామా వంటి వ్యక్తిగతంగా గుర్తించదగిన సమాచారం.</li><li><strong>అభ్యాసకుడి ప్రొఫైల్ డేటా:</strong> మీ విద్యా నేపథ్యం, మునుపటి నైపుణ్యాలు, వృత్తి ఆకాంక్షలు మరియు అభ్యాస ప్రాధాన్యతలు వంటి నైపుణ్య మార్గాలను రూపొందించడానికి మీరు అందించే సమాచారం.</li><li><strong>వినియోగ డేటా:</strong> మేము సేవకు మీ యాక్సెస్ మరియు వినియోగం గురించి స్వయంచాలకంగా సమాచారాన్ని సేకరించవచ్చు, కానీ ఈ డేటా అనామకంగా ఉంటుంది మరియు సేవ మెరుగుదల కోసం మాత్రమే ఉపయోగించబడుతుంది.</li></ul>" }, howWeUseInfo: { title: "మేము మీ సమాచారాన్ని ఎలా ఉపయోగిస్తాము", content: "<p>మీ గురించి ఖచ్చితమైన సమాచారం ఉండటం మాకు మీకు సున్నితమైన, సమర్థవంతమైన మరియు అనుకూలీకరించిన అనుభవాన్ని అందించడానికి అనుమతిస్తుంది. ప్రత్యేకంగా, సేవ ద్వారా మీ గురించి సేకరించిన సమాచారాన్ని మేము ఉపయోగించవచ్చు:</p><ul><li>మీ ఖాతాను సృష్టించడానికి మరియు నిర్వహించడానికి.</li><li>వ్యక్తిగతీకరించిన వృత్తి శిక్షణ మార్గాలను రూపొందించడానికి.</li><li>సేవ యొక్క సామర్థ్యం మరియు ఆపరేషన్‌ను మెరుగుపరచడానికి.</li><li>మీ అనుభవాన్ని మెరుగుపరచడానికి వినియోగం మరియు పోకడలను పర్యవేక్షించడానికి మరియు విశ్లేషించడానికి.</li><li>వినియోగదారు విచారణలకు ప్రతిస్పందించడానికి మరియు మద్దతును అందించడానికి.</li></ul>" }, dataSharing: { title: "డేటా భాగస్వామ్యం మరియు బహిర్గతం", content: "<p>మేము మీ వ్యక్తిగతంగా గుర్తించదగిన సమాచారాన్ని బయటి పార్టీలకు అమ్మడం, వ్యాపారం చేయడం లేదా অন্য విధంగా బదిలీ చేయడం లేదు. మా అప్లికేషన్‌ను నిర్వహించడంలో మాకు సహాయపడే విశ్వసనీయ మూడవ పక్షాలు ఇందులో చేర్చబడలేదు, ఆ పక్షాలు ఈ సమాచారాన్ని రహస్యంగా ఉంచడానికి అంగీకరించినంత కాలం. చట్టానికి అనుగుణంగా, మా సైట్ విధానాలను అమలు చేయడానికి, లేదా మా లేదా ఇతరుల హక్కులు, ఆస్తి లేదా భద్రతను రక్షించడానికి విడుదల సముచితమని మేము విశ్వసించినప్పుడు మేము మీ సమాచారాన్ని కూడా విడుదల చేయవచ్చు. అనామక, సమగ్ర డేటాను పరిశోధన మరియు విధాన-రూపకల్పన ప్రయోజనాల కోసం ఉపయోగించవచ్చు.</p>" }, dataSecurity: { title: "డేటా భద్రత", content: "<p>మీ వ్యక్తిగత సమాచారాన్ని రక్షించడంలో సహాయపడటానికి మేము పరిపాలనా, సాంకేతిక మరియు భౌతిక భద్రతా చర్యలను ఉపయోగిస్తాము. మీరు మాకు అందించిన వ్యక్తిగత సమాచారాన్ని భద్రపరచడానికి మేము సహేతుకమైన చర్యలు తీసుకున్నప్పటికీ, మా ప్రయత్నాలు ఉన్నప్పటికీ, ఏ భద్రతా చర్యలు సంపూర్ణమైనవి లేదా అభేద్యమైనవి కావు మరియు ఏ డేటా ప్రసార పద్ధతి కూడా ఏ అంతరాయం లేదా ఇతర రకమైన దుర్వినియోగానికి వ్యతిరేకంగా హామీ ఇవ్వబడదు అని దయచేసి తెలుసుకోండి.</p>" }, yourRights: { title: "మీ హక్కులు", content: "<p>మా వద్ద ఉన్న మీ సమాచారాన్ని యాక్సెస్ చేయడానికి, నవీకరించడానికి లేదా తొలగించడానికి మీకు హక్కు ఉంది. ఇది బ్రౌజర్ నిల్వను ఉపయోగించే ప్రదర్శన అప్లికేషన్ కాబట్టి, ఈ సైట్ కోసం మీ బ్రౌజర్ యొక్క స్థానిక నిల్వను క్లియర్ చేయడం ద్వారా మీరు మీ డేటాను క్లియర్ చేయవచ్చు. పూర్తి-స్థాయి అప్లికేషన్‌లో, ఈ హక్కులను నేరుగా ఉపయోగించుకోవడానికి మీకు ఖాతా నిర్వహణ సాధనాలు ఉంటాయి.</p>" }, changes: { title: "ఈ గోప్యతా విధానానికి మార్పులు", content: "<p>మేము ఎప్పటికప్పుడు ఈ గోప్యతా విధానాన్ని నవీకరించవచ్చు. ఈ పేజీలో కొత్త గోప్యతా విధానాన్ని పోస్ట్ చేయడం ద్వారా మేము ఏవైనా మార్పుల గురించి మీకు తెలియజేస్తాము. ఏవైనా మార్పుల కోసం మీరు ఈ గోప్యతా విధానాన్ని క్రమానుగతంగా సమీక్షించాలని సూచించబడింది.</p>" }, contact: { title: "మమ్మల్ని సంప్రదించండి", content: "<p>ఈ గోప్యతా విధానం గురించి మీకు ఏవైనా ప్రశ్నలు ఉంటే, దయచేసి NCVETని దాని అధికారిక ప్రభుత్వ ఛానెల్‌ల ద్వారా సంప్రదించండి. ఈ అప్లికేషన్ ఒక ప్రోటోటైప్ మరియు దానికి ప్రత్యేక మద్దతు బృందం లేదు.</p>" } },
    constants: {
        academic_backgrounds: { 'Below 8th Standard': '8వ తరగతి కంటే తక్కువ', '8th Pass': '8వ తరగతి ఉత్తీర్ణత', '10th Pass': '10వ తరగతి ఉత్తీర్ణత', '12th Pass / Intermediate': '12వ తరగతి ఉత్తీర్ణత / ఇంటర్మీడియట్', 'ITI Certificate': 'ఐటిఐ సర్టిఫికేట్', 'Polytechnic Diploma': 'పాలిటెక్నిక్ డిప్లొమా', 'Vocational Training Certificate': 'వృత్తి శిక్షణ సర్టిఫికేట్', 'Undergraduate (Pursuing)': 'అండర్గ్రాడ్యుయేట్ (చదువుతున్న)', 'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'పట్టభద్రుల డిగ్రీ', 'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'పోస్ట్ గ్రాడ్యుయేట్ డిగ్రీ', 'Doctorate (PhD)': 'డాక్టరేట్ (పిహెచ్‌డి)' },
        learning_pace_options: { 'Full-time': 'పూర్తి సమయం', 'Part-time': 'పార్ట్-టైమ్', 'Weekend only': 'వారాంతం మాత్రమే', 'Self-paced (Online)': 'స్వీయ-గతి (ఆన్‌లైన్)', 'Flexible (Hybrid)': 'ఫ్లెక్సిబుల్ (హైబ్రిడ్)' },
        common_skills: { 'Programming (Java, Python, C, etc.)': 'ప్రోగ్రామింగ్ (జావా, పైథాన్, సి, మొదలైనవి)', 'Web Development (HTML, CSS, PHP, JS)': 'వెబ్ డెవలప్‌మెంట్ (HTML, CSS, PHP, JS)', 'Data Science / AI / ML': 'డేటా సైన్స్ / AI / ML', 'Database Management (SQL, MongoDB)': 'డేటాబేస్ నిర్వహణ (SQL, MongoDB)', 'Cloud Computing (AWS, IBM Watson, Azure)': 'క్లౌడ్ కంప్యూటింగ్ (AWS, IBM వాట్సన్, అజూర్)', 'Automation (UiPath, RPA)': 'ఆటోమేషన్ (UiPath, RPA)', Cybersecurity: 'సైబర్ సెక్యూరిటీ', 'Mobile Development': 'మొబైల్ డెవలప్‌మెంట్', 'UI/UX Design': 'UI/UX డిజైన్', 'Graphic Design': 'గ్రాఫిక్ డిజైన్', 'Video Editing': 'వీడియో ఎడిటింగ్', 'Problem-Solving': 'సమస్య-పరిష్కారం', 'Data Analysis': 'డేటా విశ్లేషణ', 'Critical Thinking': 'విమర్శనాత్మక ఆలోచన', 'Research & Development': 'పరిశోధన & అభివృద్ధి', 'Project Management': 'ప్రాజెక్ట్ నిర్వహణ', 'Team Collaboration': 'జట్టు సహకారం', 'Leadership / Coordination': 'నాయకత్వం / సమన్వయం', 'Entrepreneurship / Business Planning': 'వ్యవస్థాపకత / వ్యాపార ప్రణాళిక', 'Marketing & Strategy': 'మార్కెటింగ్ & వ్యూహం', 'Digital Marketing': 'డిజిటల్ మార్కెటింగ్', Sales: 'అమ్మకాలు', Accounting: 'అకౌంటింగ్', 'Customer Service': 'కస్టమర్ సేవ', 'Innovation & Idea Generation': 'ఆవిష్కరణ & ఆలోచన ఉత్పత్తి', 'Content Writing / Presentation': 'కంటెంట్ రైటింగ్ / ప్రెజెంటేషన్', 'Design Thinking': 'డిజైన్ థింకింగ్', 'Public Speaking': 'ప్రజా ప్రసంగం', 'Communication Skills': 'కమ్యూనికేషన్ నైపుణ్యాలు', 'Time Management': 'సమయ నిర్వహణ', Adaptability: 'అనుకూలత', 'Decision Making': 'నిర్ణయం తీసుకోవడం', Networking: 'నెట్‌వర్కింగ్', 'Spoken English': 'మాట్లాడే ఇంగ్లీష్', 'IBM Watson': 'ఐబిఎం వాట్సన్', 'UiPath (RPA)': 'యుఐపాత్ (ఆర్పిఎ)', 'Git/GitHub': 'గిట్/గిట్‌హబ్', 'MS Office / Google Workspace': 'ఎంఎస్ ఆఫీస్ / గూగుల్ వర్క్‌స్పేస్', 'Data Entry': 'డేటా ఎంట్రీ', 'Electrical Wiring': 'ఎలక్ట్రికల్ వైరింగ్', Plumbing: 'ప్లంబింగ్', Welding: 'వెల్డింగ్', Carpentry: 'వడ్రంగి', 'Automotive Repair': 'ఆటోమోటివ్ మరమ్మతు', 'Cooking & Baking': 'వంట & బేకింగ్', 'Healthcare Assistance': 'ఆరోగ్య సంరక్షణ సహాయం', 'Mechanical Drawing': 'మెకానికల్ డ్రాయింగ్' },
        career_aspirations: { 'Technologist / Engineer': 'టెక్నాలజిస్ట్ / ఇంజనీర్', 'Data Analyst / AI Specialist': 'డేటా అనలిస్ట్ / AI స్పెషలిస్ట్', 'Doctor / Medical Professional': 'డాక్టర్ / మెడికల్ ప్రొఫెషనల్', 'Government / Public Sector': 'ప్రభుత్వం / ప్రభుత్వ రంగం', 'Researcher / Scientist': 'పరిశోధకుడు / శాస్త్రవేత్త', 'Innovator / Problem Solver': 'ఆవిష్కర్త / సమస్య పరిష్కర్త', 'Entrepreneur / Startup Founder': 'వ్యవస్థాపకుడు / స్టార్టప్ వ్యవస్థాపకుడు', 'Business Leader / Manager': 'వ్యాపార నాయకుడు / మేనేజర్', 'Social Entrepreneur / Change Maker': 'సామాజిక వ్యవస్థాపకుడు / మార్పు సృష్టికర్త', 'Educator / Mentor': 'విద్యావేత్త / మార్గదర్శి', 'Creative Designer / Innovator': 'క్రియేటివ్ డిజైనర్ / ఆవిష్కర్త', 'Global Professional / International Career': 'గ్లోబల్ ప్రొఫెషనల్ / అంతర్జాతీయ కెరీర్', 'Full Stack Developer': 'ఫుల్ స్టాక్ డెవలపర్', 'Cloud Computing Engineer': 'క్లౌడ్ కంప్యూటింగ్ ఇంజనీర్', 'Cybersecurity Analyst': 'సైబర్ సెక్యూరిటీ అనలిస్ట్', 'Digital Marketing Manager': 'డిజిటల్ మార్కెటింగ్ మేనేజర్', 'Logistics and Supply Chain Manager': 'లాజిస్టిక్స్ మరియు సరఫరా గొలుసు మేనేజర్', 'Solar Panel Technician': 'సోలార్ ప్యానెల్ టెక్నీషియన్', 'EV Charging Station Technician': 'EV ఛార్జింగ్ స్టేషన్ టెక్నీషియన్', 'Organic Farming Specialist': 'సేంద్రీయ వ్యవసాయ నిపుణుడు', 'Drone Operator': 'డ్రోన్ ఆపరేటర్', '3D Printing Technician': '3డి ప్రింటింగ్ టెక్నీషియన్', 'AR/VR Developer': 'AR/VR డెవలపర్', 'Robotics Engineer': 'రోబోటిక్స్ ఇంజనీర్', 'Certified Nursing Assistant (CNA)': 'సర్టిఫైడ్ నర్సింగ్ అసిస్టెంట్ (CNA)', 'Medical Lab Technician': 'మెడికల్ ల్యాబ్ టెక్నీషియన్' },
        competitive_exams: { GATE: 'గేట్ (గ్రాడ్యుయేట్ ఆప్టిట్యూడ్ టెస్ట్ ఇన్ ఇంజనీరింగ్)', NEET_PG: 'నీట్-పిజి (పోస్ట్-గ్రాడ్యుయేషన్)', UPSC_CSE: 'యుపిఎస్సి సివిల్ సర్వీసెస్ పరీక్ష', CAT: 'క్యాట్ (కామన్ అడ్మిషన్ టెస్ట్)', SSC_CGL: 'ఎస్ఎస్సి సిజిఎల్ (కంబైన్డ్ గ్రాడ్యుయేట్ లెవల్)', IBPS_PO: 'ఐబిపిఎస్ పిఓ (ప్రొబేషనరీ ఆఫీసర్)', UGC_NET: 'యుజిసి నెట్ (నేషనల్ ఎలిజిబిలిటీ టెస్ట్)', JEE: 'జెఇఇ మెయిన్ & అడ్వాన్స్‌డ్' }
    }
  },
  mr: { // Marathi
    common: { back: 'मागे', next: 'पुढे', backAria: 'मागे जा' },
    header: { about: 'बद्दल', welcome: 'स्वागत आहे', logout: 'लॉग आउट' },
    footer: { about: 'आमच्याबद्दल', privacy: 'गोपनीयता धोरण', contact: 'संपर्क', copyright: '© {year} राष्ट्रीय व्यावसायिक शिक्षण आणि प्रशिक्षण परिषद (NCVET). सर्व हक्क राखीव.', poweredBy: 'एक कुशल भारतासाठी AI द्वारे समर्थित.' },
    login: { welcomeBack: "पुन्हा स्वागत आहे!", signInToContinue: "तुमचा प्रवास सुरू ठेवण्यासाठी साइन इन करा.", emailAddress: "ईमेल पत्ता", password: "पासवर्ड", forgotPassword: "पासवर्ड विसरलात?", signIn: "साइन इन करा", signingIn: "সাইন इन होत आहे...", noAccount: "खाते नाही?", signUp: "नोंदणी करा", error: { invalidCredentials: "अवैध ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.", unknown: "एक अज्ञात त्रुटी आली. कृपया नंतर पुन्हा प्रयत्न करा." } },
    register: { title: "तुमचे खाते तयार करा", subtitle: "आजच तुमचा वैयक्तिक कौशल्य प्रवास सुरू करा.", name: { label: "पूर्ण नाव", placeholder: "उदा., प्रिया शर्मा" }, email: { label: "ईमेल पत्ता" }, password: { label: "पासवर्ड" }, createAccount: "खाते तयार करा", creatingAccount: "खाते तयार होत आहे...", alreadyHaveAccount: "आधीच खाते आहे?", signIn: "साइन इन करा", backToLogin: "लॉगिनवर परत जा", backToLoginAria: "लॉगिनवर परत जा", error: { allFieldsRequired: "सर्व फील्ड आवश्यक आहेत.", unknown: "नोंदणी दरम्यान एक अज्ञात त्रुटी आली.", passwordTooShort: 'पासवर्ड किमान ६ अक्षरे लांब असणे आवश्यक आहे.', emailExists: 'या ईमेल पत्त्यासह एक खाते आधीच अस्तित्वात आहे.', passwordInUse: 'हा पासवर्ड आधीच दुसऱ्या खात्याद्वारे वापरला जात आहे. कृपया वेगळा निवडा.' }, alert: { success: "नोंदणी यशस्वी! कृपया लॉग इन करा." } },
    forgotPassword: { title: "तुमचा पासवर्ड रीसेट करा", subtitle: "तुमचा ईमेल प्रविष्ट करा आणि आम्ही तुम्हाला तुमच्या खात्यात परत येण्यासाठी एक लिंक पाठवू.", email: { label: "ईमेल पत्ता" }, sendResetLink: "रीसेट लिंक पाठवा", rememberPassword: "तुमचा पासवर्ड आठवतोय?", signIn: "साइन इन करा", backToLogin: "लॉगिनवर परत जा", backToLoginAria: "लॉगिनवर परत जा", submitted: { title: "तुमचा ईमेल तपासा", subtitle: "जर {email} असलेले खाते अस्तित्वात असेल, तर आम्ही तुमचा पासवर्ड रीसेट करण्यासाठी सूचना पाठवल्या आहेत.", backToSignIn: "সাইন ইন करण्यासाठी परत जा" } },
    dashboard: { welcome: "पुन्हा स्वागत आहे", subtitle: "तुम्ही खाली तुमचे जतन केलेले कौशल्य मार्ग पाहू शकता किंवा नवीन तयार करू शकता.", generateNew: "नवीन कौशल्य मार्ग तयार करा", savedOn: "जतन केले", viewPathway: "मार्ग पहा", noSavedPathways: { title: "कोणतेही जतन केलेले मार्ग नाहीत", subtitle: "नवीन कौशल्य मार्ग तयार करून प्रारंभ करा." } },
    form: { title: "तुमचा कौशल्य मार्ग शोधा", subtitle: "तुमची वैयक्तिकृत करिअर योजना मिळवण्यासाठी खालील पायऱ्या पूर्ण करा.", step1: { title: "तुमची पार्श्वभूमी", academicBackground: { label: "सर्वोच्च शैक्षणिक पार्श्वभूमी" }, priorSkills: { label: "पूर्वीची कौशल्ये किंवा अनुभव (लागू असलेले सर्व निवडा)", helper: "तुमच्याकडे आधीपासून असलेली कोणतीही कौशल्ये निवडा. हे आम्हाला तुमचा मार्ग तयार करण्यास मदत करेल." } }, step2: { title: "तुमची ध्येये", careerAspiration: { label: "करिअरची आकांक्षा / ध्येय", placeholder: "उदा., सौर पॅनेल तंत्रज्ञ, AI/ML विशेषज्ञ" }, preferredLocation: { label: "पसंतीचे कामाचे ठिकाण (शहर/राज्य)", placeholder: "उदा., बंगळूर, कर्नाटक" }, learningPace: { label: "पसंतीची शिकण्याची गती" }, preferredLanguage: { label: "मार्गासाठी पसंतीची भाषा" }, generatePathway: "मार्ग तयार करा" } },
    pathwayGraph: { title: "तुमचा शिकण्याचा रोडमॅप" },
    pathwayDisplay: { share: 'मार्ग शेअर करा', linkCopied: 'लिंक कॉपी केली!', shareFailed: 'शेअरिंग अयशस्वी', timelineTitle: 'तुमची शिकण्याची टाइमलाइन', duration: 'कालावधी:', nsqfLevel: 'NSQF स्तर:', watchSuggested: 'सुचवलेले ट्यूटोरियल पहा', findTutorials: 'YouTube वर ट्यूटोरियल शोधा', searchPrepared: "आम्ही तुमच्यासाठी संबंधित व्हिडिओंचा शोध तयार केला आहे.", backToForm: 'फॉर्मवर परत जा', savePathway: 'मार्ग जतन करा', prepareForExams: 'परीक्षांची तयारी करा', provideFeedback: 'अभिप्राय द्या', downloadPathway: 'मार्ग डाउनलोड करा' },
    marketInsights: { title: 'करिअर मार्केटची अंतर्दृष्टी', jobDemand: 'नोकरीची मागणी', salary: 'पगाराची अपेक्षा (प्रवेश-स्तर)', hiringCompanies: 'शीर्ष भरती कंपन्या', keySkills: 'मागणीतील प्रमुख कौशल्ये' },
    careerGuidance: { title: 'वैयक्तिकृत करिअर मार्गदर्शन', companiesAndSectors: 'शीर्ष कंपन्या आणि क्षेत्रे', topPick: 'शीर्ष निवड', recommendedCompany: 'तुमची शिफारस केलेली कंपनी', roadmap: '{companyName} मध्ये नोकरी मिळवण्यासाठी तुमचा रोडमॅप', skillsToHighlight: 'हायलाइट करण्यासाठी कौशल्ये', interviewPrep: 'मुलाखतीची तयारी', networkingTips: 'नेटवर्किंग टिपा' },
    chat: { title: 'AI कौशल्य सहाय्यक', initialMessage: 'नमस्कार! आज मी तुमच्या करिअर आणि कौशल्य प्रवासात तुम्हाला कशी मदत करू शकेन?', unavailable: 'क्षमस्व, चॅट सहाय्यक सध्या अनुपलब्ध आहे.', errorMessage: 'क्षमस्व, मला एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.', placeholder: 'प्रश्न विचारा...' },
    examHub: { title: 'परीक्षा तयारी हब', downloadPlan: 'योजना डाउनलोड करा', backToPathway: 'मार्गावर परत जा', generating: 'तुमची अभ्यास योजना तयार करत आहे...', showPriorityOnly: 'फक्त प्राधान्य दाखवा', noPriorityItems: 'तुम्ही कोणतेही आयटम उच्च प्राधान्य म्हणून चिन्हांकित केलेले नाही.', error: { title: 'त्रुटी', failed: 'अभ्यास योजना तयार करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.', selectExam: 'अभ्यास योजना मिळवण्यासाठी कृपया एक परीक्षा निवडा.' }, plan: { title: '{examName} साठी अभ्यास योजना', roadmap: 'अभ्यास रोडमॅप', books: 'शिफारस केलेली पुस्तके', courses: 'ऑनलाइन अभ्यासक्रम', questions: 'सराव प्रश्न', question: 'प्रश्न {index}', answer: 'उत्तर:' }, form: { title: 'एक परीक्षा निवडा', subtitle: 'वैयक्तिकृत अभ्यास योजना तयार करण्यासाठी स्पर्धात्मक परीक्षा निवडा.', label: 'स्पर्धात्मक परीक्षा निवडा', button: 'अभ्यास योजना तयार करा' } },
    feedbackModal: { title: 'अभिप्राय द्या', close: 'मोडल बंद करा', subtitle: 'ही मार्ग शिफारस कशी होती? तुमची अंतर्दृष्टी आम्हाला आमचे AI सुधारण्यास मदत करते.', placeholder: "उदा., पायऱ्या खूप स्पष्ट होत्या, पण मला नवशिक्यांसाठी अधिक संसाधने पाहायला आवडतील...", cancel: 'रद्द करा', submit: 'अभिप्राय सबमिट करा', submitted: { title: 'धन्यवाद!', message: 'तुमचा अभिप्राय प्राप्त झाला आहे. आम्हाला सुधारण्यास मदत केल्याबद्दल आम्ही तुमचे कौतुक करतो.' } },
    app: { loading: { title: "तुमचा वैयक्तिकृत मार्ग तयार करत आहे...", subtitle: "आमचे AI तुमच्यासाठी योग्य कौशल्य प्रवास तयार करण्यासाठी तुमच्या प्रोफाइलचे विश्लेषण करत आहे." }, error: { pathwayGeneration: "मार्ग तयार करण्यात अयशस्वी. कृपया तुमची API की तपासा आणि पुन्हा प्रयत्न करा.", userNotFound: "वापरकर्ता आढळला नाही." }, alert: { pathwaySaved: "मार्ग यशस्वीरित्या जतन केला!", pathwaySaveFailed: "मार्ग जतन करू शकलो नाही. कृपया पुन्हा प्रयत्न करा." } },
    about: { title: "NCVET स्किल नेव्हिगेटर AI बद्दल", subtitle: "भारतात यशस्वी व्यावसायिक करिअरसाठी तुमचे वैयक्तिकृत मार्गदर्शक.", mission: { title: "आमचे ध्येय", description: "आमचे ध्येय भारतातील प्रत्येक शिकाऊला त्यांच्या आकांक्षा आणि श्रम बाजाराच्या वास्तविक-वेळेच्या मागण्यांशी जुळणारी व्यावसायिक कौशल्ये मिळवण्यासाठी एक स्पष्ट, वैयक्तिकृत आणि अनुकूल मार्गाने सक्षम करणे आहे. शिक्षण आणि रोजगार यांच्यातील दरी कमी करणे, एका भरभराटीच्या भारतासाठी एक कुशल कार्यबल तयार करणे हे आमचे ध्येय आहे." }, whoWeAre: { title: "आम्ही कोण आहोत", description1: "स्किल नेव्हिगेटर AI हा <strong>राष्ट्रीय व्यावसायिक शिक्षण आणि प्रशिक्षण परिषद (NCVET)</strong>, भारतातील व्यावसायिक शिक्षणासाठी राष्ट्रीय नियामक, यांचा एक उपक्रम आहे. आम्ही देशभरात कौशल्य विकासासाठी उच्च मानके स्थापित करण्यास आणि टिकवून ठेवण्यास वचनबद्ध आहोत.", description2: "हे प्लॅटफॉर्म राष्ट्रीय कौशल्य पात्रता फ्रेमवर्क (NSQF) शी थेट समाकलित होते जेणेकरून प्रत्येक शिफारस विश्वासार्ह, मान्यताप्राप्त आणि तुमच्या करिअरसाठी मौल्यवान असेल याची खात्री करता येईल." }, technology: { title: "तंत्रज्ञान", description1: "हे प्लॅटफॉर्म अत्याधुनिक कृत्रिम बुद्धिमत्तेद्वारे समर्थित आहे. आम्ही तुमची शैक्षणिक पार्श्वभूमी, विद्यमान कौशल्ये आणि करिअरची ध्येये यासह तुमच्या अद्वितीय प्रोफाइलचे विश्लेषण करण्यासाठी प्रगत AI मॉडेल वापरतो.", description2: "आमचे AI शिफारस इंजिन नंतर तुमच्या प्रोफाइलला NCVET-मान्यताप्राप्त पात्रता आणि वास्तविक-वेळेच्या श्रम बाजार डेटाच्या विशाल डेटाबेसशी जुळवते आणि फक्त तुमच्यासाठी एक सानुकूलित शिकण्याचा प्रवास तयार करते." } },
    features: { title: "स्किल नेव्हिगेटर AI का निवडावे?", subtitle: "तुमच्या करिअर प्रवासाला अत्याधुनिक तंत्रज्ञान आणि सरकारने मान्यता दिलेल्या मानकांसह सक्षम करण्यासाठी डिझाइन केलेले एक व्यापक प्लॅटफॉर्म.", aiPowered: { title: "AI-समर्थित शिफारसी", description: "आमचे स्मार्ट AI तुमची पार्श्वभूमी आणि ध्येये समजून घेते आणि फक्त तुमच्यासाठी एक अद्वितीय शिकण्याचा मार्ग तयार करते, जो AI/ML-चालित शिकाऊ प्रोफाइलिंग आणि शिफारस इंजिनवर आधारित आहे." }, govRecognized: { title: "सरकारने मान्यता दिलेले मार्ग", description: "आमचे सर्व शिफारस केलेले अभ्यासक्रम राष्ट्रीय मानकांशी (NCVET & NSQF) जुळतात, जे प्रशिक्षण कार्यक्रमांशी थेट समाकलित असलेल्या महत्त्वाच्या पात्रतेसाठी आहेत." }, clearDashboard: { title: "स्पष्ट करिअर डॅशबोर्ड", description: "शिकाऊ, प्रशिक्षक आणि धोरणकर्त्यांसाठी सोप्या, वापरण्यास-सोप्या करिअर मार्गदर्शन डॅशबोर्डवर तुमच्या प्रगतीचा मागोवा घ्या आणि करिअरचे पर्याय एक्सप्लोर करा." }, jobInsights: { title: "वास्तविक-वेळेची नोकरीची अंतर्दृष्टी", description: "आम्ही तुमच्या कौशल्यांना श्रम बाजाराच्या बुद्धिमत्तेच्या वास्तविक-वेळेच्या मॅपिंगसह मागणीत असलेल्या गोष्टींशी जोडतो, ज्यामुळे उद्योग संरेखन सुनिश्चित होते." }, multilingual: { title: "तुमच्या भाषेत शिकणे", description: "एकाधिक भाषांमध्ये मार्गदर्शन मिळवा. आमचे प्लॅटफॉर्म विविध शिकाऊ गटांसाठी एक बहुभाषिक, समावेशक आणि प्रवेशयोग्य समाधान आहे." }, reliablePlatform: { title: "विश्वसनीय आणि जलद प्लॅटफॉर्म", description: "आमची मजबूत, स्केलेबल आर्किटेक्चर एक गुळगुळीत आणि अवलंबून राहण्यायोग्य अनुभव सुनिश्चित करते, जे संपूर्ण भारतातील लाखो शिकाऊंना समर्थन देण्यासाठी तयार आहे." }, dataSafe: { title: "तुमचा डेटा सुरक्षित आहे", description: "आम्ही तुमच्या वैयक्तिक माहितीचे सर्व वेळी संरक्षण करण्यासाठी कठोर गोपनीयता आणि सुरक्षा नियमांचे पालन करतो, ज्यामुळे पूर्ण अनुपालन सुनिश्चित होते." } },
    contactPage: { title: "आमच्याशी संपर्क साधा", subtitle: "आम्ही मदतीसाठी येथे आहोत. खालील चॅनेलद्वारे आमच्याशी संपर्क साधा.", addressTitle: "आमचा पत्ता", address: "राष्ट्रीय व्यावसायिक शिक्षण आणि प्रशिक्षण परिषद (NCVET)<br>कौशल भवन, बी-2, पुसा रोड, करोल बाग,<br>नवी दिल्ली – 110005, भारत", phoneTitle: "फोन नंबर", phone: "+91 8328605892", emailTitle: "ईमेल पत्ता", email: "shaikhydumiya1127@gmail.com", note: "या अनुप्रयोगाबद्दल चौकशीसाठी, कृपया वर दिलेल्या संपर्क तपशीलांचा वापर करा." },
    privacyPolicy: { title: "गोपनीयता धोरण", lastUpdated: "शेवटचे अद्यतनित: १ ऑगस्ट, २०२४", introduction: { title: "प्रस्तावना", content: "<p>NCVET स्किल नेव्हिगेटर AI मध्ये आपले स्वागत आहे. आम्ही तुमच्या गोपनीयतेचे संरक्षण करण्यास वचनबद्ध आहोत. तुम्ही आमचा अनुप्रयोग वापरता तेव्हा आम्ही तुमची माहिती कशी गोळा करतो, वापरतो, उघड करतो आणि संरक्षित करतो हे हे गोपनीयता धोरण स्पष्ट करते. कृपया हे धोरण काळजीपूर्वक वाचा.</p>" }, informationWeCollect: { title: "आम्ही गोळा करत असलेली माहिती", content: "<p>आम्ही तुमच्याबद्दल विविध मार्गांनी माहिती गोळा करू शकतो. सेवेवर आम्ही गोळा करू शकणाऱ्या माहितीमध्ये हे समाविष्ट आहे:</p><ul><li><strong>वैयक्तिक डेटा:</strong> वैयक्तिकरित्या ओळखण्यायोग्य माहिती, जसे की तुमचे नाव आणि ईमेल पत्ता, जे तुम्ही सेवेवर नोंदणी करता तेव्हा तुम्ही स्वेच्छेने आम्हाला देता.</li><li><strong>शिकणाऱ्याची प्रोफाइल डेटा:</strong> तुमची शैक्षणिक पार्श्वभूमी, पूर्वीची कौशल्ये, करिअरच्या आकांक्षा आणि शिकण्याच्या प्राधान्यांसारखी कौशल्ये तयार करण्यासाठी तुम्ही प्रदान केलेली माहिती.</li><li><strong>वापर डेटा:</strong> आम्ही सेवेवर तुमच्या प्रवेशाबद्दल आणि वापराविषयी आपोआप माहिती गोळा करू शकतो, परंतु हा डेटा अनामिक असतो आणि केवळ सेवा सुधारण्यासाठी वापरला जातो.</li></ul>" }, howWeUseInfo: { title: "आम्ही तुमची माहिती कशी वापरतो", content: "<p>तुमच्याबद्दल अचूक माहिती असणे आम्हाला तुम्हाला एक गुळगुळीत, कार्यक्षम आणि सानुकूलित अनुभव प्रदान करण्यास अनुमती देते. विशेषतः, आम्ही सेवेद्वारे तुमच्याबद्दल गोळा केलेली माहिती वापरू शकतो:</p><ul><li>तुमचे खाते तयार करण्यासाठी आणि व्यवस्थापित करण्यासाठी.</li><li>वैयक्तिकृत व्यावसायिक प्रशिक्षण मार्ग तयार करण्यासाठी.</li><li>सेवेची कार्यक्षमता आणि कार्यप्रणाली सुधारण्यासाठी.</li><li>तुमचा अनुभव सुधारण्यासाठी वापर आणि ट्रेंडचे निरीक्षण आणि विश्लेषण करण्यासाठी.</li><li>वापरकर्त्याच्या चौकशीला प्रतिसाद देण्यासाठी आणि समर्थन देण्यासाठी.</li></ul>" }, dataSharing: { title: "डेटा सामायिकरण आणि उघड करणे", content: "<p>आम्ही तुमची वैयक्तिकरित्या ओळखण्यायोग्य माहिती बाहेरील पक्षांना विकत नाही, व्यापार करत नाही किंवा अन्यथा हस्तांतरित करत नाही. यामध्ये आमचा अनुप्रयोग चालविण्यात आम्हाला मदत करणाऱ्या विश्वसनीय तृतीय पक्षांचा समावेश नाही, जोपर्यंत ते पक्ष ही माहिती गोपनीय ठेवण्यास सहमत असतात. कायदा, आमच्या साइट धोरणांची अंमलबजावणी करण्यासाठी, किंवा आमचे किंवा इतरांचे हक्क, मालमत्ता किंवा सुरक्षिततेचे संरक्षण करण्यासाठी रिलीझ योग्य आहे असे आम्हाला वाटल्यास आम्ही तुमची माहिती देखील रिलीझ करू शकतो. अनामिक, एकत्रित डेटा संशोधन आणि धोरण-निर्ધારण हेतूंसाठी वापरला जाऊ शकतो.</p>" }, dataSecurity: { title: "डेटा सुरक्षा", content: "<p>आम्ही तुमची वैयक्तिक माहिती संरक्षित करण्यात मदत करण्यासाठी प्रशासकीय, तांत्रिक आणि भौतिक सुरक्षा उपायांचा वापर करतो. तुम्ही आम्हाला प्रदान केलेली वैयक्तिक माहिती सुरक्षित करण्यासाठी आम्ही वाजवी पावले उचलली असली तरी, कृपया लक्षात घ्या की आमच्या प्रयत्नांनंतरही, कोणतेही सुरक्षा उपाय परिपूर्ण किंवा अभेद्य नाहीत आणि डेटा ट्रान्समिशनची कोणतीही पद्धत कोणत्याही व्यत्यय किंवा इतर प्रकारच्या गैरवापरापासून हमी देऊ शकत नाही.</p>" }, yourRights: { title: "तुमचे हक्क", content: "<p>आमच्याकडे असलेल्या तुमच्या माहितीमध्ये प्रवेश करण्याचा, अद्यतनित करण्याचा किंवा हटवण्याचा तुम्हाला हक्क आहे. हे ब्राउझर स्टोरेज वापरणारे एक प्रदर्शन अनुप्रयोग असल्याने, तुम्ही या साइटसाठी तुमच्या ब्राउझरचे स्थानिक स्टोरेज साफ करून तुमचा डेटा साफ करू शकता. पूर्ण-प्रमाणातील अनुप्रयोगात, तुमच्याकडे हे हक्क थेट वापरण्यासाठी खाते व्यवस्थापन साधने असतील.</p>" }, changes: { title: "या गोपनीयता धोरणातील बदल", content: "<p>आम्ही वेळोवेळी हे गोपनीयता धोरण अद्यतनित करू शकतो. आम्ही या पृष्ठावर नवीन गोपनीयता धोरण पोस्ट करून तुम्हाला कोणत्याही बदलांबद्दल सूचित करू. कोणत्याही बदलांसाठी तुम्हाला वेळोवेळी या गोपनीयता धोरणाचे पुनरावलोकन करण्याचा सल्ला दिला जातो.</p>" }, contact: { title: "आमच्याशी संपर्क साधा", content: "<p>या गोपनीयता धोरणाबद्दल तुम्हाला काही प्रश्न असल्यास, कृपया NCVET शी त्याच्या अधिकृत सरकारी चॅनेलद्वारे संपर्क साधा. हा अनुप्रयोग एक प्रोटोटाइप आहे आणि त्याला समर्पित समर्थन संघ नाही.</p>" } },
    constants: {
        academic_backgrounds: { 'Below 8th Standard': '८वी पेक्षा कमी', '8th Pass': '८वी उत्तीर्ण', '10th Pass': '१०वी उत्तीर्ण', '12th Pass / Intermediate': '१२वी उत्तीर्ण / इंटरमीडिएट', 'ITI Certificate': 'आयटीआय प्रमाणपत्र', 'Polytechnic Diploma': 'पॉलिटेक्निक डिप्लोमा', 'Vocational Training Certificate': 'व्यावसायिक प्रशिक्षण प्रमाणपत्र', 'Undergraduate (Pursuing)': 'पदवीधर (शिक्षण घेत आहे)', 'Graduate Degree (e.g., B.A, B.Sc, B.Com, BCA, B.Tech, B.E, MBBS)': 'पदवी', 'Postgraduate Degree (e.g., M.A, M.Sc, MBA, MCA, M.Tech, MD, MS)': 'पदव्युत्तर पदवी', 'Doctorate (PhD)': 'डॉक्टरेट (पीएचडी)' },
        learning_pace_options: { 'Full-time': 'पूर्ण-वेळ', 'Part-time': 'अर्ध-वेळ', 'Weekend only': 'फक्त शनिवार-रविवार', 'Self-paced (Online)': 'स्व-गती (ऑनलाइन)', 'Flexible (Hybrid)': 'लवचिक (हायब्रीड)' },
        common_skills: { 'Programming (Java, Python, C, etc.)': 'प्रोग्रामिंग (जावा, पायथन, सी, इ.)', 'Web Development (HTML, CSS, PHP, JS)': 'वेब डेव्हलपमेंट (HTML, CSS, PHP, JS)', 'Data Science / AI / ML': 'डेटा सायन्स / AI / ML', 'Database Management (SQL, MongoDB)': 'डेटाबेस व्यवस्थापन (SQL, MongoDB)', 'Cloud Computing (AWS, IBM Watson, Azure)': 'क्लाउड कॉम्प्युటింగ్ (AWS, IBM वॉटसन, अझूर)', 'Automation (UiPath, RPA)': 'ऑटोमेशन (UiPath, RPA)', Cybersecurity: 'सायबर सुरक्षा', 'Mobile Development': 'मोबाइल डेव्हलपमेंट', 'UI/UX Design': 'UI/UX डिझाइन', 'Graphic Design': 'ग्राफिक डिझाइन', 'Video Editing': 'व्हिडिओ एडिटिंग', 'Problem-Solving': 'समस्या-निवारण', 'Data Analysis': 'डेटा विश्लेषण', 'Critical Thinking': 'चिकित्सक विचार', 'Research & Development': 'संशोधन आणि विकास', 'Project Management': 'प्रकल्प व्यवस्थापन', 'Team Collaboration': 'संघ सहयोग', 'Leadership / Coordination': 'नेतृत्व / समन्वय', 'Entrepreneurship / Business Planning': 'उद्योजकता / व्यवसाय नियोजन', 'Marketing & Strategy': 'विपणन आणि धोरण', 'Digital Marketing': 'डिजिटल मार्केटिंग', Sales: 'विक्री', Accounting: 'हिशेब', 'Customer Service': 'ग्राहक सेवा', 'Innovation & Idea Generation': 'नवीनता आणि कल्पना निर्मिती', 'Content Writing / Presentation': 'सामग्री लेखन / सादरीकरण', 'Design Thinking': 'डिझाइन थिंकिंग', 'Public Speaking': 'सार्वजनिक भाषण', 'Communication Skills': 'संवाद कौशल्ये', 'Time Management': 'वेळेचे व्यवस्थापन', Adaptability: 'अनुकूलता', 'Decision Making': 'निर्णय घेणे', Networking: 'नेटवर्किंग', 'Spoken English': 'बोलले जाणारे इंग्रजी', 'IBM Watson': 'आयबीएम वॉटसन', 'UiPath (RPA)': 'यूआयपाथ (आरपीए)', 'Git/GitHub': 'गिट/गिटहब', 'MS Office / Google Workspace': 'एमएस ऑफिस / गुगल वर्कस्पेस', 'Data Entry': 'डेटा एंट्री', 'Electrical Wiring': 'इलेक्ट्रिकल वायरिंग', Plumbing: 'प्लंबिंग', Welding: 'वेल्डिंग', Carpentry: 'सुतारकाम', 'Automotive Repair': 'ऑटोमोटिव्ह दुरुस्ती', 'Cooking & Baking': 'स्वयंपाक आणि बेकिंग', 'Healthcare Assistance': 'आरोग्यसेवा सहाय्य', 'Mechanical Drawing': 'मेकॅनिकल ड्रॉइंग' },
        career_aspirations: { 'Technologist / Engineer': 'तंत्रज्ञ / अभियंता', 'Data Analyst / AI Specialist': 'डेटा विश्लेषक / AI विशेषज्ञ', 'Doctor / Medical Professional': 'डॉक्टर / वैद्यकीय व्यावसायिक', 'Government / Public Sector': 'सरकार / सार्वजनिक क्षेत्र', 'Researcher / Scientist': 'संशोधक / शास्त्रज्ञ', 'Innovator / Problem Solver': 'नवीन शोधक / समस्या निवारक', 'Entrepreneur / Startup Founder': 'उद्योजक / स्टार्टअप संस्थापक', 'Business Leader / Manager': 'व्यवसाय नेता / व्यवस्थापक', 'Social Entrepreneur / Change Maker': 'सामाजिक उद्योजक / बदल घडवणारे', 'Educator / Mentor': 'शिक्षक / मार्गदर्शक', 'Creative Designer / Innovator': 'सर्जनशील डिझाइनर / नवीन शोधक', 'Global Professional / International Career': 'जागतिक व्यावसायिक / आंतरराष्ट्रीय करिअर', 'Full Stack Developer': 'फुल स्टॅक डेव्हलपर', 'Cloud Computing Engineer': 'क्लाउड कॉम्प्युటింగ్ अभियंता', 'Cybersecurity Analyst': 'सायबर सुरक्षा विश्लेषक', 'Digital Marketing Manager': 'डिजिटल मार्केटिंग व्यवस्थापक', 'Logistics and Supply Chain Manager': 'लॉजिस्टिक आणि पुरवठा साखळी व्यवस्थापक', 'Solar Panel Technician': 'सौर पॅनेल तंत्रज्ञ', 'EV Charging Station Technician': 'ईव्ही चार्जिंग स्टेशन तंत्रज्ञ', 'Organic Farming Specialist': 'सेंद्रिय शेती विशेषज्ञ', 'Drone Operator': 'ड्रोन ऑपरेटर', '3D Printing Technician': '3डी प्रिंटिंग तंत्रज्ञ', 'AR/VR Developer': 'एआर/व्हीआर डेव्हलपर', 'Robotics Engineer': 'रोबोटिक्स अभियंता', 'Certified Nursing Assistant (CNA)': 'प्रमाणित नर्सिंग सहाय्यक (सीएनए)', 'Medical Lab Technician': 'वैद्यकीय प्रयोगशाळा तंत्रज्ञ' },
        competitive_exams: { GATE: 'गेट (ग्रॅज्युएट अॅप्टिट्यूड टेस्ट इन इंजिनिअरिंग)', NEET_PG: 'नीट-पीजी (पदव्युत्तर)', UPSC_CSE: 'यूपीएससी नागरी सेवा परीक्षा', CAT: 'कॅट (कॉमन अॅडमिशन टेस्ट)', SSC_CGL: 'एसएससी सीजीएल (संयुक्त पदवीधर स्तर)', IBPS_PO: 'आयबीपीएस पीओ (प्रोबेशनरी ऑफिसर)', UGC_NET: 'यूजीसी नेट (राष्ट्रीय पात्रता परीक्षा)', JEE: 'जेईई मेन आणि अॅडव्हान्स्ड' }
    }
  }
};