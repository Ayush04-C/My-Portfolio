'use client';

import { useState, useRef, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import SplitText from '../components/hoverwords';
import SpotlightCard from '../components/SpotlightCard';
import Link from 'next/link';
import FadeContent from '../components/FadeContent';

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const AboutMe = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_TEMPLATE_ID || '',
        formRef.current!,
        process.env.NEXT_PUBLIC_PUBLIC_KEY || ''
      );

      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      formRef.current?.reset();
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
  <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0}>
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-left justify-center text-black gap-2 p-6">
        <div className="flex flex-row text-left justify-start gap">  
          <Link href="/"><div className="w-10 h-10 rounded-full shadow flex items-center justify-center">1</div></Link>
          <Link href="/aboutme"><div className="w-10 h-10 rounded-full shadow flex items-center justify-center">2</div></Link>
          <Link href="/projects"><div className="w-10 h-10 rounded-full shadow flex items-center justify-center">3</div></Link>
          <Link href="/ContactMe"><div className="w-10 h-10 rounded-full shadow flex items-center justify-center">4</div></Link>
        </div>
        <div className='text-center w-150'>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <SplitText
                    text="Get In Touch"
                    className="text-2xl font-semibold mb-4"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.1}
                    rootMargin="-100px"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />
                  <h1 className="text-base leading-relaxed">
                    <p className='text-left text-1xmd mb-1'><span className="text-gray-500">Don't be shy</span></p>
                    <hr />
                    <p className='text-gray-500 text-left mt-2' style={{fontWeight:'600', fontSize:'0.9rem'}}>Let us connect and discuss our next steps.</p>
                    <form ref={formRef} onSubmit={handleSubmit} className='text-gray-500 text-left mt-2' style={{fontSize:'0.8rem', textAlign:'left', color:'gray'}}>
                        <div className='bg-gray-100 border border-gray-300 rounded-[25px] p-3'>
                            <span className='font-semibold text-black'>Name</span>
                            <input 
                              type="text" 
                              name="user_name"
                              placeholder="Your Name" 
                              required
                              className='w-full mt-2 p-2 rounded-[15px] border border-gray-300 bg-white focus:outline-none'
                            />
                            <span className='font-semibold text-black'>Email</span>
                            <input 
                              type="email" 
                              name="user_email"
                              placeholder="Your Email" 
                              required
                              className='w-full mt-2 p-2 rounded-[15px] border border-gray-300 bg-white focus:outline-none'
                            />
                            <span className='font-semibold text-black'>Message</span>
                            <textarea 
                              name="message"
                              placeholder="Your Message" 
                              required
                              className='w-full mt-2 p-2 rounded-[15px] border border-gray-300 bg-white focus:outline-none'
                            />
                            <div className='flex justify-center mt-2'>
                                <button 
                                  type="submit"
                                  disabled={isSubmitting}
                                  className='bg-black w-full rounded-full px-6 py-3 text-[15px] text-white hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {isSubmitting ? 'Sending...' : submitStatus === 'success' ? '✓ Sent!' : submitStatus === 'error' ? '✗ Failed' : 'Send Message'}
                                </button>
                            </div>
                        </div>
                    </form>
                  </h1>
                  <h1 className="text-1xl font-[10px] mt-3 text-left">Other ways to contact me</h1>
                  <ul className="list-disc pl-5 text-[15px] space-y-1 mt-2 text-left justify-center item-left">
                    <li><a href="mailto:ayushchhatre29@gmail.com"><span className='text-gray-500'>Email</span>: ayushchhatre29@gmail.com</a></li>
                    <li><a href="https://github.com/Ayush04-C"><span className='text-gray-500'>GitHub</span>: github.com/Ayush04-C</a></li>
                    <li><a href="https://www.linkedin.com/in/ayush-santosh-chhatre-7a68b4336/"><span className='text-gray-500'>LinkedIn</span>: /in/ayush-santosh-chhatre</a></li>
                    <li><span className='text-gray-500'>Available as Freelancer</span></li>
                </ul>
          </SpotlightCard>
        </div>
      </div>
    </div>
   </FadeContent>
  );
}

export default AboutMe;