'use client';

import SplitText from '../components/hoverwords';
import SpotlightCard from '../components/SpotlightCard';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import FadeContent from '../components/FadeContent';

// Load Carousel dynamically on the client to avoid a large initial bundle
// and reduce the Projects page first paint time.
const Carousel = dynamic(() => import('../components/Carousel'), {
  ssr: false,
});



const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function projects() {
  return (
  <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="relative flex flex-col items-left justify-center text-black gap-2 p-6">
        <div className="flex flex-row text-left justify-start gap">  
         <Link href="/"><div className="w-10 h-10 flex shadow items-center justify-center rounded-full bg-white text-black font-semibold transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110 hover:bg-black hover:text-white">1</div></Link>
          <Link href="/aboutme"><div className="w-10 h-10 flex shadow items-center justify-center rounded-full bg-white text-black font-semibold transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110 hover:bg-black hover:text-white">2</div></Link>
          <Link href="/projects"><div className="w-10 h-10 flex shadow items-center justify-center rounded-full bg-white text-black font-semibold transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110 hover:bg-black hover:text-white">3</div></Link>
          <Link href="/ContactMe"><div className="w-10 h-10 flex shadow items-center justify-center rounded-full bg-white text-black font-semibold transition-all duration-500 ease-in-out hover:rotate-[360deg] hover:scale-110 hover:bg-black hover:text-white">4</div></Link>
        </div>
        <div className='text-center w-150'>
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
                  <SplitText
                    text="My Builds"
                    className="text-2xl font-semibold mb-15"
                    delay={100}
                    duration={0.6}
                    ease="power3.out"
                    splitType="chars"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    threshold={0.01}
                    rootMargin="0px"
                    onLetterAnimationComplete={handleAnimationComplete}
                  />
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
                      <Carousel
                        baseWidth={500}
                        autoplay={true}
                        autoplayDelay={2000}
                        pauseOnHover={true}
                        loop={true}
                        round={false}
                      />
                    </Suspense>
                  </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
   </FadeContent>
  );
}
