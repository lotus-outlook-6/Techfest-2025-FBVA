
import React, { useState, useRef, useEffect } from 'react';
import { UserData } from './App';

const COLLEGES = [
  "ASSAM UNIVERSITY SILCHAR",
  "NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR",
  "POLYTECHNIC SILCHAR",
  "SILCHAR MEDICAL COLLEGE AND HOSPITAL",
  "Others"
];

interface UserSignupProps {
  onSuccess?: (userData: UserData) => void;
}

const UserSignup: React.FC<UserSignupProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    middleName: '',
    lastName: '',
    college: '',
    otherCollege: '',
  });

  // Master gate: No errors show until the first submit button hit
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const [shakeFields, setShakeFields] = useState<Record<string, boolean>>({});
  
  // Submission Status Logic
  const [submissionPhase, setSubmissionPhase] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitHovered, setIsSubmitHovered] = useState(false);
  const [isSubmitGlitching, setIsSubmitGlitching] = useState(false);
  
  // Track focus for individual numeric blocks
  const [focusedPhoneIdx, setFocusedPhoneIdx] = useState<number | null>(null);
  const [focusedRegIdIdx, setFocusedRegIdIdx] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [phoneDigits, setPhoneDigits] = useState<string[]>(new Array(10).fill(''));
  const phoneRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [regIdDigits, setRegIdDigits] = useState<string[]>(new Array(11).fill(''));
  const regIdRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFieldValid = (name: string): boolean => {
    if (name === 'middleName') return true;
    if (name === 'username') return formData.username.length >= 8; 
    if (name === 'firstName') return !!formData.firstName;
    if (name === 'lastName') return !!formData.lastName;
    if (name === 'college') return !!formData.college;
    if (name === 'otherCollege') return formData.college === 'Others' ? !!formData.otherCollege : true;
    if (name === 'phone') return phoneDigits.every(d => d !== '');
    if (name === 'regId') return formData.college === 'ASSAM UNIVERSITY SILCHAR' ? regIdDigits.every(d => d !== '') : true;
    return true;
  };

  const shouldShowFieldLevelError = (name: string): boolean => {
    if (!hasSubmittedOnce) return false;
    if (focusedField === name) return false;
    return !isFieldValid(name);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith('@')) val = '@' + val;
    const cleaned = '@' + val.slice(1).toLowerCase().replace(/[^a-z0-9]/g, '');
    setFormData({ ...formData, username: cleaned });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const onlyLetters = value.replace(/[^a-zA-Z]/g, '');
    if (onlyLetters.length === 0) {
      setFormData({ ...formData, [name]: '' });
      return;
    }
    const formatted = onlyLetters.charAt(0).toUpperCase() + onlyLetters.slice(1).toLowerCase();
    setFormData({ ...formData, [name]: formatted });
  };

  const handleOtherCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const formatted = val.split(' ').map(word => {
      if (word.length === 0) return '';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
    setFormData({ ...formData, otherCollege: formatted });
  };

  const handleCollegeSelect = (college: string) => {
    setFormData({ 
      ...formData, 
      college,
      otherCollege: '' 
    });
    setRegIdDigits(new Array(11).fill(''));
    setIsDropdownOpen(false);
  };

  const handlePhoneDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...phoneDigits];
    const lastChar = value.slice(-1);
    newDigits[index] = lastChar;
    setPhoneDigits(newDigits);
    if (lastChar && index < 9) {
      phoneRefs.current[index + 1]?.focus();
    }
  };

  const handleRegIdDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...regIdDigits];
    const lastChar = value.slice(-1);
    newDigits[index] = lastChar;
    setRegIdDigits(newDigits);
    if (lastChar && index < 10) {
      regIdRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionPhase !== 'IDLE') return;
    setHasSubmittedOnce(true);
    const fieldsToValidate = ['username', 'firstName', 'lastName', 'college', 'phone'];
    if (formData.college === 'Others') fieldsToValidate.push('otherCollege');
    if (formData.college === 'ASSAM UNIVERSITY SILCHAR') fieldsToValidate.push('regId');
    const newShakes: Record<string, boolean> = {};
    let hasError = false;
    fieldsToValidate.forEach(field => {
      if (!isFieldValid(field)) {
        newShakes[field] = true;
        hasError = true;
      }
    });
    if (hasError) {
      setShakeFields(newShakes);
      setTimeout(() => setShakeFields({}), 1000);
    } else {
      const finalPhone = phoneDigits.join('');
      const finalRegId = regIdDigits.join('');
      console.log('✅ [LOG] Registration Initiated:', { ...formData, phone: finalPhone, regId: finalRegId, timestamp: new Date().toISOString() });
      setSubmissionPhase('PROCESSING');
      setTimeout(() => {
        setSubmissionPhase('SUCCESS');
        console.log('✅ [LOG] User Created Successfully');
        if (onSuccess) {
          onSuccess({
            username: formData.username,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            college: formData.college,
            otherCollege: formData.otherCollege,
            phone: finalPhone,
            regId: isAus ? finalRegId : undefined
          });
        }
        setTimeout(() => setSubmissionPhase('IDLE'), 4000);
      }, 5000);
    }
  };

  const getTextFieldStyle = (name: string, hasValue: boolean, isFocused: boolean) => {
    const isInvalid = shouldShowFieldLevelError(name);
    let base = "w-full h-12 md:h-16 bg-white/[0.02] rounded-xl px-6 text-white font-space text-lg outline-none transition-all duration-500 border ";
    if (isFocused) return base + "border-fuchsia-500/50 focus:bg-white/[0.04] ring-0 shadow-none";
    if (isInvalid) return base + "border-red-500 ring-2 ring-red-500/40 bg-red-500/5";
    if (hasValue) return base + "border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.3)] bg-fuchsia-500/[0.04]";
    return base + "border-white/10";
  };

  const isAus = formData.college === 'ASSAM UNIVERSITY SILCHAR';

  return (
    <div className="w-full h-full bg-transparent relative flex flex-col items-center pt-8 md:pt-12 px-6 overflow-y-auto custom-scrollbar no-horizontal-scroll pb-32">
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[999999] w-[92%] max-w-md pointer-events-none transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) ${submissionPhase === 'IDLE' ? 'translate-y-40 opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="bg-white rounded-[2rem] p-5 md:p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] flex items-center gap-5 overflow-hidden relative border-b-4 border-fuchsia-500 pointer-events-auto">
          <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${submissionPhase === 'PROCESSING' ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
              <div className="absolute inset-0 border-[3px] border-fuchsia-100 rounded-full"></div>
              <div className="absolute inset-0 border-[3px] border-t-fuchsia-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center"><svg className="w-8 h-8 text-fuchsia-600" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg></div>
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${submissionPhase === 'SUCCESS' ? 'scale-100 opacity-100 rotate-0' : 'scale-150 opacity-0 rotate-12'}`}><div className="w-full h-full bg-black rounded-full flex items-center justify-center"><svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg></div></div>
          </div>
          <div className="flex-1 relative h-12 overflow-hidden">
            <div className={`absolute inset-0 flex items-center gap-1 transition-all duration-700 ease-in-out ${submissionPhase === 'PROCESSING' ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'}`}><span className="text-black font-space font-bold text-xl tracking-tight">Creating User</span><div className="flex gap-1.5 pt-2.5"><span className="w-2 h-2 bg-black rounded-full animate-[blink_1.4s_infinite_100ms]"></span><span className="w-2 h-2 bg-black rounded-full animate-[blink_1.4s_infinite_300ms]"></span><span className="w-2 h-2 bg-black rounded-full animate-[blink_1.4s_infinite_500ms]"></span></div></div>
            <div className={`absolute inset-0 flex items-center transition-all duration-700 ease-in-out ${submissionPhase === 'SUCCESS' ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}><span className="text-black font-space font-bold text-xl tracking-tight">User created successfully!</span></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mb-12 md:mb-20 text-center animate-fade-in-header">
        <h2 className="text-5xl md:text-8xl font-anton tracking-[0.05em] text-white uppercase opacity-95 leading-tight">USER <span className="text-fuchsia-500 drop-shadow-[0_0_15px_#d946ef]">REGISTRATION</span></h2>
        <div className="h-[1.5px] w-full max-w-2xl bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent mx-auto mt-4"></div>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 w-full max-w-5xl flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '0ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${shouldShowFieldLevelError('username') ? 'text-red-500' : (formData.username.length > 1 ? 'text-white' : 'text-white/30')} group-hover:text-white`}>USERNAME:</label>
          <div className={`flex-1 ${shakeFields.username ? 'animate-shake' : ''}`}><input type="text" name="username" value={formData.username} onFocus={() => setFocusedField('username')} onBlur={() => setFocusedField(null)} onChange={handleUsernameChange} placeholder="@username (min 8 chars)" className={getTextFieldStyle('username', formData.username.length > 1, focusedField === 'username')} autoComplete="off" /></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '100ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${shouldShowFieldLevelError('firstName') ? 'text-red-500' : (formData.firstName ? 'text-white' : 'text-white/30')} group-hover:text-white`}>FIRST NAME:</label>
          <div className={`flex-1 ${shakeFields.firstName ? 'animate-shake' : ''}`}><input type="text" name="firstName" value={formData.firstName} onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} onChange={handleNameChange} className={getTextFieldStyle('firstName', !!formData.firstName, focusedField === 'firstName')} autoComplete="off" /></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '200ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase transition-all duration-500 ${formData.middleName ? 'text-white' : 'text-white/30'} group-hover:text-white`}>MIDDLE NAME:</label>
          <div className="flex-1"><input type="text" name="middleName" value={formData.middleName} onFocus={() => setFocusedField('middleName')} onBlur={() => setFocusedField(null)} onChange={handleNameChange} className={getTextFieldStyle('middleName', !!formData.middleName, focusedField === 'middleName')} autoComplete="off" /></div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '300ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${shouldShowFieldLevelError('lastName') ? 'text-red-500' : (formData.lastName ? 'text-white' : 'text-white/30')} group-hover:text-white`}>LAST NAME:</label>
          <div className={`flex-1 ${shakeFields.lastName ? 'animate-shake' : ''}`}><input type="text" name="lastName" value={formData.lastName} onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} onChange={handleNameChange} className={getTextFieldStyle('lastName', !!formData.lastName, focusedField === 'lastName')} autoComplete="off" /></div>
        </div>

        {/* Phone Number - Reverted desktop to h-16 (Normal), kept mobile h-20 (Longer) */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '400ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${hasSubmittedOnce && !isFieldValid('phone') ? 'text-red-500' : (phoneDigits.some(d => d) ? 'text-white' : 'text-white/30')} group-hover:text-white`}>PHONE NUMBER:</label>
          <div className={`flex-1 flex gap-1.5 md:gap-3 justify-between items-center h-20 md:h-16 ${shakeFields.phone ? 'animate-shake' : ''}`}>
            {phoneDigits.map((digit, idx) => {
              const isFocused = focusedPhoneIdx === idx;
              const hasValue = !!digit;
              const isBlockInError = hasSubmittedOnce && !isFieldValid('phone') && !hasValue && !isFocused;
              return (
                <div key={idx} className="relative w-full h-full">
                  <input
                    ref={el => { phoneRefs.current[idx] = el; }}
                    type="text" maxLength={1} value={digit}
                    onFocus={() => setFocusedPhoneIdx(idx)} onBlur={() => setFocusedPhoneIdx(null)}
                    onChange={(e) => handlePhoneDigitChange(idx, e.target.value)}
                    onKeyDown={(e) => e.key === 'Backspace' && !phoneDigits[idx] && idx > 0 && phoneRefs.current[idx - 1]?.focus()}
                    className={`w-full h-full bg-white/[0.03] border rounded-lg text-center text-white font-anton text-lg md:text-2xl outline-none transition-all duration-300
                      ${isFocused ? 'border-fuchsia-500/50 bg-white/10 ring-0 shadow-none' : 
                        (isBlockInError ? 'border-red-500 ring-2 ring-red-500/40 bg-red-500/5' : 
                          (hasValue ? 'border-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.4)] bg-fuchsia-500/5' : 'border-white/10'))}`}
                  />
                  {isBlockInError && <span className="absolute inset-0 flex items-center justify-center text-red-500 font-anton text-2xl pointer-events-none animate-pulse">*</span>}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 group relative z-50 mb-6 md:mb-8 animate-stagger-up" style={{ animationDelay: '500ms' }}>
          <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${shouldShowFieldLevelError('college') ? 'text-red-500' : (formData.college ? 'text-white' : 'text-white/30')} group-hover:text-white`}>COLLEGE NAME:</label>
          <div className={`flex-1 relative ${shakeFields.college ? 'animate-shake' : ''}`} ref={dropdownRef}>
            <button
              type="button" onClick={() => { setIsDropdownOpen(!isDropdownOpen); setFocusedField('college'); }} onBlur={() => setFocusedField(null)}
              className={`w-full h-12 md:h-16 bg-[#0a0a0a] border rounded-xl px-6 text-left flex items-center justify-between transition-all duration-[800ms] cubic-bezier(0.19, 1, 0.22, 1)
                ${isDropdownOpen ? 'border-fuchsia-500/60 ring-2 ring-fuchsia-500/10 bg-fuchsia-500/[0.03]' : (shouldShowFieldLevelError('college') ? 'border-red-500 ring-2 ring-red-500/40 bg-red-500/5' : (formData.college ? 'border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.25)]' : 'border-white/10'))}
                ${formData.college ? 'text-white' : 'text-white/40'}
              `}
            >
              <span className="font-space text-sm md:text-lg uppercase tracking-wider truncate">{formData.college || "SELECT YOUR INSTITUTION"}</span>
              <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center border transition-all duration-500 shrink-0 ml-4 ${isDropdownOpen ? 'border-fuchsia-500 bg-fuchsia-500/10 shadow-[0_0_15px_#d946ef]' : 'border-white/10 bg-white/5 group-hover:border-fuchsia-500/40'}`}><svg className={`w-4 h-4 md:w-5 md:h-5 text-fuchsia-500 transition-transform duration-700 cubic-bezier(0.19, 1, 0.22, 1) ${isDropdownOpen ? 'rotate-180 drop-shadow-[0_0_8px_#d946ef]' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg></div>
            </button>
            <div className={`absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-3xl border border-fuchsia-500/40 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-500 origin-top z-[100] ${isDropdownOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-95 pointer-events-none'}`}>
              <div className="py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                {COLLEGES.map((college) => (
                  <div key={college} onClick={() => handleCollegeSelect(college)} className={`px-6 py-4 cursor-pointer font-anton tracking-[0.1em] text-sm md:text-lg transition-all duration-300 relative group/opt ${formData.college === college ? 'text-fuchsia-500 bg-fuchsia-500/10' : 'text-white/70'} hover:text-white hover:pl-9`}><div className="absolute left-0 top-0 bottom-0 w-1 bg-fuchsia-500 scale-y-0 group-hover/opt:scale-y-100 transition-transform origin-top"></div><span className="relative z-10">{college}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {formData.college === 'Others' && (
          <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-fade-in-up">
            <label className={`md:w-[42%] text-lg md:text-2xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${shouldShowFieldLevelError('otherCollege') ? 'text-red-500' : (formData.otherCollege ? 'text-white' : 'text-white/30')} group-hover:text-white`}>PLEASE SPECIFY:</label>
            <div className={`flex-1 ${shakeFields.otherCollege ? 'animate-shake' : ''}`}><input type="text" name="otherCollege" value={formData.otherCollege} onFocus={() => setFocusedField('otherCollege')} onBlur={() => setFocusedField(null)} onChange={handleOtherCollegeChange} placeholder="ENTER YOUR COLLEGE NAME" className={getTextFieldStyle('otherCollege', !!formData.otherCollege, focusedField === 'otherCollege')} /></div>
          </div>
        )}

        {/* Registration ID for AUS - Reverted desktop to h-16 (Normal), kept mobile h-20 (Longer) */}
        {isAus && (
          <div className="flex flex-col md:flex-row md:items-center gap-3 group mb-6 md:mb-8 animate-fade-in-up">
            <label className={`md:w-[42%] text-base md:text-xl font-anton tracking-[0.08em] transition-all duration-500 uppercase ${hasSubmittedOnce && !isFieldValid('regId') ? 'text-red-500' : (regIdDigits.some(d => d) ? 'text-fuchsia-500 drop-shadow-[0_0_8px_rgba(217,70,239,0.6)]' : 'text-white/30')}`}>REGISTRATION ID [ONLY FOR AUS STUDENTS]:</label>
            <div className={`flex-1 flex gap-1 md:gap-2 justify-between items-center h-20 md:h-16 ${shakeFields.regId ? 'animate-shake' : ''}`}>
              {regIdDigits.map((digit, idx) => {
                const isFocused = focusedRegIdIdx === idx;
                const hasValue = !!digit;
                const isBlockInError = hasSubmittedOnce && !isFieldValid('regId') && !hasValue && !isFocused;
                return (
                  <div key={idx} className="relative w-full h-full">
                    <input
                      ref={el => { regIdRefs.current[idx] = el; }}
                      type="text" maxLength={1} value={digit}
                      onFocus={() => setFocusedRegIdIdx(idx)} onBlur={() => setFocusedRegIdIdx(null)}
                      onChange={(e) => handleRegIdDigitChange(idx, e.target.value)}
                      onKeyDown={(e) => e.key === 'Backspace' && !regIdDigits[idx] && idx > 0 && regIdRefs.current[idx - 1]?.focus()}
                      className={`w-full h-full bg-white/[0.03] border rounded-lg text-center text-white font-anton text-lg md:text-2xl outline-none transition-all duration-300
                        ${isFocused ? 'border-fuchsia-500/50 bg-white/10 ring-0 shadow-none' : 
                          (isBlockInError ? 'border-red-500 ring-2 ring-red-500/40 bg-red-500/5' : 
                            (hasValue ? 'border-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.4)] bg-fuchsia-500/5' : 'border-white/10'))}`}
                      autoComplete="off"
                    />
                    {isBlockInError && <span className="absolute inset-0 flex items-center justify-center text-red-500 font-anton text-2xl pointer-events-none animate-pulse">*</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8 md:mt-12 flex justify-center pb-20 animate-stagger-up" style={{ animationDelay: '700ms' }}>
          <button type="submit" onMouseEnter={() => { setIsSubmitHovered(true); setIsSubmitGlitching(true); }} onMouseLeave={() => { setIsSubmitHovered(false); setIsSubmitGlitching(false); }} className={`group relative outline-none transition-all duration-500 flex flex-col items-center justify-center px-20 py-4 md:px-28 md:py-5 active:scale-95 ${submissionPhase !== 'IDLE' ? 'pointer-events-none opacity-50' : ''}`}>
            <div className={`absolute inset-0 bg-fuchsia-600/10 blur-[40px] rounded-full transition-opacity duration-700 ${isSubmitHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            <div className="absolute inset-0 bg-[#0c0c0c] border border-fuchsia-500/30 transition-all duration-700 group-hover:border-fuchsia-500 group-hover:scale-[1.02] shadow-[inset_0_0_15px_rgba(217,70,239,0.1)]" style={{ clipPath: 'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)' }}>
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#d946ef_1.5px,transparent_1.5px)] bg-[size:8px_8px]"></div>
              <div className="absolute left-2 top-3 bottom-3 w-[1.5px] bg-fuchsia-950/40 rounded-full overflow-hidden"><div className={`absolute bottom-0 left-0 w-full bg-fuchsia-500 transition-all duration-1000 ease-out shadow-[0_0_6px_#d946ef] ${isSubmitHovered ? 'h-full' : 'h-[15%]'}`}></div></div>
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isSubmitHovered ? 'opacity-100' : 'opacity-0'}`}><div className="absolute top-0 left-0 w-full h-[1.5px] bg-fuchsia-400/40 blur-[1px] animate-[scan_2.5s_linear_infinite]"></div></div>
            </div>
            <div className="relative z-10 flex flex-col items-center p-2"><span className={`text-white font-anton tracking-[0.2em] transition-all duration-500 text-3xl md:text-5xl ${isSubmitGlitching ? 'animate-[glitch-shadow-custom_0.2s_infinite]' : ''}`}>SUBMIT</span></div>
          </button>
        </div>
      </form>

      <style>{`
        @keyframes scan { 0% { transform: translateY(0); opacity: 0; } 15% { opacity: 0.6; } 85% { opacity: 0.6; } 100% { transform: translateY(100%); opacity: 0; } }
        @keyframes glitch-shadow-custom { 0% { text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff; transform: translate(0); } 50% { text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff; transform: translate(-1.5px, 0.5px); } 100% { text-shadow: 0 0 #ff00ff, 0 0 #00ffff; transform: translate(0); } }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes fade-in-header { from { opacity: 0; transform: scale(0.98) translateY(-10px); filter: blur(5px); } to { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); } }
        .animate-fade-in-header { animation: fade-in-header 1s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        @keyframes stagger-up { from { opacity: 0; transform: translateY(20px); filter: blur(4px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        .animate-stagger-up { animation: stagger-up 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards; opacity: 0; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
        @keyframes blink { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }
      `}</style>
    </div>
  );
};

export default UserSignup;
