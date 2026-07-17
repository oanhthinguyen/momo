import { SEO } from '../components/SEO';
import Hero from '../components/Hero';
import Categories from '../components/Categories';

export default function Home() {
  return (
    <div className="page-transition">
      <SEO title="Trang Chủ" description="Momo Review - Trang đánh giá bỉm, sữa, đồ chơi giáo dục uy tín nhất dành cho mẹ và bé." />
      <Hero />
      <Categories />
    </div>
  );
}
