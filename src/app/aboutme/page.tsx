'use client';

import SplitText from '../components/hoverwords';
import SpotlightCard from '../components/SpotlightCard';
import Link from 'next/link';
import FadeContent from '../components/FadeContent';

  
const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

const AboutMe = () => {
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
                    text="Nice to meet you!"
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
                    <p className='text-left text-2xl mb-3'><span className="font-semibold">About me</span></p>
                    <p className='text-gray-500 text-left mb-2' style={{fontWeight:'600', fontSize:'0.9rem'}}> Who Am I </p>
                    <hr />
                    <div className='text-gray-500 text-left mt-2' style={{fontSize:'0.8rem', textAlign:'left', color:'gray'}}>
                      <p>Struggling with CSS trying to make it work.</p>
                      <p className='text-black mt-2 mb-2' style={{fontSize:'1.2rem', fontWeight:'500'}}> My Intro </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>I am undergraduate student at <span className="font-semibold">the Indian Institute of Technology Bombay</span></li>
                        <li>A passionate web developer exploring the exciting world of Web3. I’m currently diving deep into blockchain development and looking to contribute to impactful projects.</li>
                        <li>While I still enjoy experimenting with frontend design and improving my CSS skills, my growing interest lies in building secure and scalable decentralized applications.</li>
                      </ul>
                      <p className='text-black mt-2 mb-2' style={{fontSize:'1.2rem', fontWeight:'500'}}> Fun Facts about me </p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>My major is in Metallurgical Engineering and materials science.</li>
                        <li>I love to play volleyball. Participated in various tournaments in my institute.</li>
                        <li>Have a keen interest in anime and manga and ethical hacking.</li>
                      </ul>
                    </div>
                  </h1>
          </SpotlightCard>
        </div>
      </div>
    </div>
   </FadeContent>
  );
}

export default AboutMe;