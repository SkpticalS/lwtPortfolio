import Hero from '@/sections/Hero';
import Marquee from '@/sections/Marquee';
import PersonalStatement from '@/sections/PersonalStatement';
import ExperienceCards from '@/sections/ExperienceCards';
import PortfolioProjects from '@/sections/PortfolioProjects';
import AIGCEmerge from '@/sections/AIGCEmerge';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <PersonalStatement />
      <ExperienceCards />
      <PortfolioProjects />
      <AIGCEmerge />
    </>
  );
}
