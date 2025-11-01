'use client';

import SplitText from './components/hoverwords';
import SpotlightCard from './components/SpotlightCard';
import Link from 'next/link';
import FadeContent from './components/FadeContent';

  
const handleAnimationComplete = () => {
  // console.log('All letters have animated!');
};

export default function Home() {
  return (  
  <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0}>
    <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
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
                    text="Hello, Visitor!"
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
                    <p className='text-left text-2xl mb-3'>Hi, I’m <span className="font-semibold">Ayush</span></p>
                    <p className='text-gray-500 text-left mb-2' style={{fontWeight:'600', fontSize:'0.9rem'}}> Full Stack Dev </p>
                    <hr />
                    <div className='text-gray-500 text-left mt-2' style={{fontSize:'0.8rem', textAlign:'left', color:'gray'}}>
                      <p>I build smart contracts, usually busy playing bugs occasionally touching grass.</p>
                      <p className='text-black mt-2 mb-2' style={{fontSize:'1.2rem', fontWeight:'700'}}> What Can I Do </p>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Built and deployed responsive web applications using reactjs and Tailwind CSS</li>
                        <li>Architectured a fully functional Decentralized Application on Web3 and integrated real time payment to blockchain in the medical field</li>
                        <li>Orchestrated a Sorting AI, categorizing huge chunks of data efficiently in multiple groups helps in academic growth of students</li>
                        <li>Created a full-stack Timetable for users to see their timetable according to the fetched data of user using REST-API, serving more than 10,000 users</li>
                        <li>Created a smart contract using Solidity and tested it using Hardhat, and built the frontend with React.js for the marketplace where users can buy and sell digital assets using ETH</li>
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
