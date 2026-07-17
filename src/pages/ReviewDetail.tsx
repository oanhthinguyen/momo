import { SEO } from '../components/SEO';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Star, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMockData } from '../data/useMockData';

import './ReviewDetail.css';

// Dữ liệu mẫu (Mock data) cho trang chi tiết
const mockReviewDetails = {
  vi: {
    1: { category: 'Bỉm dán', title: 'Đánh giá bỉm dán Merries Newborn chi tiết', rating: 5, date: '10/05/2026', author: 'Mẹ Bơ', content: 'Merries từ lâu đã là "chân ái" của rất nhiều mẹ bỉm sữa Việt Nam. Dòng bỉm dán Newborn đặc biệt nổi trội bởi bề mặt tiếp xúc vô cùng mềm mịn, rãnh thông khí thông minh giúp giảm thiểu tối đa tình trạng hăm tã cho trẻ sơ sinh. Khả năng thấm hút của Merries thì không cần bàn cãi, bé có thể ngủ xuyên đêm mà mông vẫn khô ráo.', pros: ['Bề mặt siêu mềm mại, an toàn cho da nhạy cảm.', 'Thấm hút tốt, chống tràn hiệu quả.', 'Vạch báo đầy tiện lợi.', 'Lớp đáy thoáng khí tuyệt vời.'], cons: ['Giá thành cao hơn so với mặt bằng chung.', 'Form bỉm hơi nhỏ so với số kg khuyến nghị (nên tăng size sớm).'], imageColor: '#ffb8c5' },
    2: { category: 'Bỉm quần', title: 'Bỉm quần Moony xanh size M có xứng đáng đồng tiền?', rating: 4, date: '12/05/2026', author: 'Mẹ Sóc', content: 'Bỉm quần Moony xanh là một sự lựa chọn tuyệt vời cho giai đoạn bé bắt đầu tập lẫy, tập bò. Lưng thun của Moony được thiết kế rất mềm, co giãn linh hoạt theo từng cử động của bé mà không hề để lại hằn đỏ trên bụng. Hơn nữa, thiết kế rãnh thấm phân lỏng giúp giữ vệ sinh rất tốt.', pros: ['Lưng thun siêu mềm, không gây hằn bụng bé.', 'Thiết kế riêng biệt cho bé trai / bé gái.', 'Thấm hút phân lỏng rất tốt.', 'Sợi Nano siêu nhỏ mịn màng.'], cons: ['Mùi bỉm mới mở ra hơi hắc nhẹ.', 'Đôi khi bị vón cục nếu bé tè quá nhiều.'], imageColor: '#a4d3e2' },
    3: { category: 'Bỉm dán', title: 'Review bỉm dán Huggies Platinum Nature Made', rating: 5, date: '15/05/2026', author: 'Mẹ Đậu', content: 'Phiên bản Platinum Nature Made của Huggies thực sự làm mình bất ngờ. Bỉm cực kỳ mỏng nhẹ, thiết kế sang trọng và đặc biệt là bảng thành phần có bổ sung Vitamin E từ tinh dầu thiên nhiên. Trộm vía bé nhà mình dùng từ lúc sơ sinh đến giờ không hề bị hăm một lần nào.', pros: ['Siêu mỏng (chỉ 5mm), mặc như không mặc.', 'Chiết xuất thiên nhiên lành tính.', 'Bề mặt 3D thấm hút cực nhanh.'], cons: ['Miếng dán bên hông đôi khi hơi cứng.', 'Size bỉm có cảm giác to hơn form chuẩn một chút.'], imageColor: '#fde4a9' },
    4: { category: 'Bỉm quần', title: 'Bỉm quần Bobby Extra Soft-Dry - Giải pháp kinh tế', rating: 4, date: '20/05/2026', author: 'Mẹ Gạo', content: 'Nếu các mẹ đang tìm kiếm một dòng bỉm giá cả phải chăng để dùng ban ngày cho bé thì Bobby Extra Soft-Dry là ứng cử viên sáng giá. Bỉm được cải tiến mềm hơn trước rất nhiều, có lớp đệm lưng thấm mồ hôi siêu tiện lợi cho những bé hay đổ mồ hôi lưng.', pros: ['Giá thành cực kỳ hợp lý, dễ mua ở mọi siêu thị.', 'Có lớp đệm lưng thấm mồ hôi rất hay.', 'Đa dạng kích cỡ, dễ dàng tìm mua.'], cons: ['Bỉm hơi dày, mặc mùa hè dễ bị nóng.', 'Độ mềm mại không thể so được với các dòng bỉm nội địa Nhật.'], imageColor: '#e2e8f0' },
    5: { category: 'Sữa số 1 (0-6 tháng)', title: 'Sữa Meiji số 0 nội địa Nhật', rating: 5, date: '01/06/2026', author: 'Mẹ Cún', content: 'Meiji số 0 nội địa Nhật luôn nằm trong top sữa được các bác sĩ Nhi khoa và các mẹ khuyên dùng. Sữa có vị nhạt thanh rất giống sữa mẹ nên bé dễ dàng làm quen. Đặc biệt, sữa tập trung phát triển chiều cao và trí não thay vì cân nặng, bé đi ngoài rất đều và phân đẹp.', pros: ['Vị nhạt thanh giống sữa mẹ, dễ uống.', 'Phát triển đồng đều chiều cao và trí tuệ.', 'Sữa mát, hạn chế tối đa tình trạng táo bón.'], cons: ['Không giúp tăng cân nhanh bứt phá.', 'Cách pha hơi khác so với sữa Việt/Âu (pha nước 70 độ).'], imageColor: '#fca5a5' },
    6: { category: 'Sữa số 2 (6-12 tháng)', title: 'Review sữa Aptamil Úc số 2', rating: 5, date: '05/06/2026', author: 'Mẹ Sam', content: 'Aptamil Úc nổi tiếng với công thức Profutura cung cấp hệ dưỡng chất hoàn hảo cho bé. Thành phần chứa men vi sinh Probiotic Bifidobacterium M-16V giúp hệ tiêu hóa của bé cực kỳ khỏe mạnh. Từ khi chuyển sang Aptamil, bé nhà mình ít ốm vặt hơn hẳn.', pros: ['Hệ men vi sinh xuất sắc, bé không bao giờ bị táo bón.', 'Giàu DHA giúp phát triển trí não vượt trội.', 'Mùi vị thơm ngon, béo ngậy.'], cons: ['Giá thành khá cao thuộc phân khúc cao cấp.', 'Sữa hơi khó tan khi pha nước nguội.'], imageColor: '#93c5fd' },
    7: { category: 'Sữa số 1 (0-6 tháng)', title: 'Sữa Nan Optipro số 1', rating: 4, date: '10/06/2026', author: 'Mẹ Ken', content: 'Nan Optipro của Nestle là dòng sữa "quốc dân" nhờ đặc tính siêu mát và dễ tiêu hóa. Với công thức đạm chất lượng cao Optipro, bé hấp thu tốt mà không bị quá tải đường ruột. Một lựa chọn an toàn và tiết kiệm cho những năm tháng đầu đời của bé.', pros: ['Siêu mát, rất hiếm khi gây táo bón.', 'Dễ tiêu hóa, phù hợp cơ địa nhạy cảm.', 'Giá cả bình dân, dễ tìm mua ở mọi nơi.'], cons: ['Vị sữa hơi nhạt và tanh nhẹ (do chứa vi chất).', 'Bé tăng cân khá chậm.'], imageColor: '#86efac' },
    8: { category: 'Sữa số 3 (1+ tuổi)', title: 'Sữa Pediasure Úc nắp tím cho bé biếng ăn', rating: 5, date: '15/06/2026', author: 'Mẹ Cam', content: 'Cứu tinh cho các bé lười ăn, thấp còi. Pediasure Úc cung cấp nguồn năng lượng cao và dồi dào dưỡng chất thiết yếu. Mình cho bé uống dặm thêm vào buổi tối và thấy bé lên cân khá rõ rệt sau 1 tháng sử dụng. Mùi Vani rất thơm và ngọt vừa phải.', pros: ['Cung cấp năng lượng cao, giúp bé nhanh tăng cân.', 'Mùi vị cực kỳ thơm ngon, kích thích vị giác.', 'Bổ sung đầy đủ vitamin và khoáng chất thiết yếu.'], cons: ['Quá nhiều năng lượng, nếu uống thay bữa chính có thể khiến bé chán ăn cơm.', 'Sữa khá đặc và ngọt hơn các dòng sữa công thức thông thường.'], imageColor: '#d8b4fe' },
    9: { category: 'Trẻ sơ sinh', title: 'Kệ chữ A sinh động cho bé sơ sinh', rating: 5, date: '01/07/2026', author: 'Mẹ Nấm', content: 'Kệ chữ A với các con vật treo ngộ nghĩnh là món đồ chơi không thể thiếu cho các bé sơ sinh đang trong giai đoạn tập với tay và nhìn màu sắc. Âm thanh lách cách của lục lạc giúp thu hút sự chú ý của bé, giúp bé nằm chơi ngoan để mẹ rảnh tay làm việc nhà.', pros: ['Chất liệu nhựa ABS an toàn, không chứa BPA.', 'Thiết kế bo tròn, không có góc cạnh sắc nhọn.', 'Dễ dàng tháo lắp và cất giữ.'], cons: ['Chỉ thích hợp cho giai đoạn dưới 6 tháng tuổi.', 'Một số chi tiết treo hơi cao với bé.'], imageColor: '#fcd34d' },
    10: { category: 'Vận động', title: 'Xe tập đi bằng gỗ an toàn', rating: 4, date: '05/07/2026', author: 'Mẹ Thỏ', content: 'Xe tập đi bằng gỗ với các chú chim gõ lốc cốc là người bạn đồng hành tuyệt vời cho bé trong giai đoạn chập chững. Thiết kế xe rất vững chãi, đẩy tới không bị trượt bánh nhanh nên rất an toàn, giúp bé tự tin sải bước.', pros: ['Thiết kế chống lật, tốc độ di chuyển an toàn.', 'Âm thanh gõ vui tai kích thích bé đẩy xe.', 'Gỗ tự nhiên bền bỉ, sơn an toàn cho trẻ.'], cons: ['Hơi nặng so với xe tập đi bằng nhựa.', 'Không thể gấp gọn mang đi chơi.'], imageColor: '#34d399' },
    11: { category: 'Trí tuệ', title: 'Bộ xếp hình Lego Duplo cơ bản', rating: 5, date: '10/07/2026', author: 'Bố Ken', content: 'Lego Duplo luôn là khoản đầu tư vô cùng xứng đáng. Các khối gạch to bản nên hoàn toàn không sợ bé nuốt nhầm. Bé nhà mình chơi miết không chán, tự sáng tạo ra đủ thứ hình thù, giúp rèn luyện cả tư duy không gian lẫn sự khéo léo của đôi tay.', pros: ['Kích thước khối to, an toàn tuyệt đối.', 'Màu sắc rực rỡ, nhựa siêu bền không phai.', 'Kích thích khả năng sáng tạo không giới hạn.'], cons: ['Giá thành chính hãng khá đắt đỏ.', 'Cần mua thêm nhiều bộ để ghép được các mô hình lớn.'], imageColor: '#60a5fa' },
    12: { category: 'Trí tuệ', title: 'Sách vải tương tác Montessori', rating: 5, date: '15/07/2026', author: 'Mẹ Cáo', content: 'Sách vải tương tác Montessori là công cụ tuyệt vời để phát triển xúc giác và kỹ năng vận động tinh cho bé. Bé có thể sờ, bóp, cài nút, kéo khóa... Tất cả đều mềm mại, có thể giặt máy sạch sẽ, thực sự là một món đồ chơi giáo dục hoàn hảo.', pros: ['Chất liệu vải mềm, không gây trầy xước.', 'Nhiều hoạt động thú vị (cài cúc, thắt nơ, lật mở).', 'Dễ dàng giặt sạch bằng máy giặt.'], cons: ['Bé có thể nhanh chán khi đã thành thạo các kỹ năng.', 'Dễ bị mất các chi tiết nhỏ nếu không cất kỹ.'], imageColor: '#f472b6' }
  },
  en: {
    1: { category: 'Tape Diapers', title: 'Detailed Review: Merries Newborn Tape Diaper', rating: 5, date: 'May 10, 2026', author: 'Mommy Bo', content: 'Merries has long been a favorite among Vietnamese mothers. The Newborn tape series stands out with its incredibly soft surface and smart ventilation channels that minimize diaper rash. The absorbency is undeniable; babies can sleep through the night while keeping their bottom perfectly dry.', pros: ['Super soft surface, safe for sensitive skin.', 'Excellent absorbency and leak protection.', 'Convenient wetness indicator.', 'Highly breathable bottom layer.'], cons: ['Higher price compared to average diapers.', 'Slightly smaller fit than the recommended weight (size up early).'], imageColor: '#ffb8c5' },
    2: { category: 'Pants Diapers', title: 'Is Moony Blue Pants Size M worth the money?', rating: 4, date: 'May 12, 2026', author: 'Mommy Soc', content: 'Moony Blue Pants are an excellent choice when your baby starts rolling and crawling. The elastic waistband is designed to be very soft, stretching flexibly with every movement without leaving red marks. Furthermore, the liquid stool absorption channel is highly effective.', pros: ['Super soft waistband, leaves no marks.', 'Specific designs for boys / girls.', 'Excellent runny stool absorption.', 'Ultra-fine Nano fibers.'], cons: ['Slight chemical smell when first opened.', 'Can sometimes clump if heavily soiled.'], imageColor: '#a4d3e2' },
    3: { category: 'Tape Diapers', title: 'Huggies Platinum Nature Made Tape Diaper Review', rating: 5, date: 'May 15, 2026', author: 'Mommy Dau', content: 'The Platinum Nature Made version from Huggies really surprised me. The diaper is extremely thin, elegant, and notably enriched with Vitamin E from natural oils. Thankfully, my baby has been using it since birth without a single rash.', pros: ['Ultra-thin (only 5mm), feels like wearing nothing.', 'Gentle natural extracts.', '3D surface for rapid absorption.'], cons: ['Side tapes can feel a bit stiff at times.', 'Sizing feels slightly larger than standard.'], imageColor: '#fde4a9' },
    4: { category: 'Pants Diapers', title: 'Bobby Extra Soft-Dry Pants - Economical Choice', rating: 4, date: 'May 20, 2026', author: 'Mommy Gao', content: 'If mothers are looking for an affordable daytime diaper, Bobby Extra Soft-Dry is a bright candidate. The diapers are significantly softer now and feature a sweat-absorbing back cushion, which is very convenient for babies who sweat a lot on their backs.', pros: ['Very reasonable price, easy to find in supermarkets.', 'Innovative sweat-absorbing back pad.', 'Wide range of sizes available.'], cons: ['Slightly thick, can be warm in the summer.', 'Not as soft as premium Japanese domestic brands.'], imageColor: '#e2e8f0' },
    5: { category: 'Stage 1 (0-6 months)', title: 'Meiji Stage 0 Japanese Domestic', rating: 5, date: 'June 01, 2026', author: 'Mommy Cun', content: 'Meiji Stage 0 is highly recommended by pediatricians and mothers alike. Its mild taste closely resembles breast milk, making it easy for babies to accept. It focuses on brain and height development rather than rapid weight gain, ensuring healthy digestion.', pros: ['Mild taste similar to breast milk.', 'Promotes balanced height and brain development.', 'Cooling formula, prevents constipation.'], cons: ['Does not promote rapid weight gain.', 'Preparation requires 70°C water, different from Western formulas.'], imageColor: '#fca5a5' },
    6: { category: 'Stage 2 (6-12 months)', title: 'Aptamil Australia Stage 2 Review', rating: 5, date: 'June 05, 2026', author: 'Mommy Sam', content: 'Aptamil Australia with Profutura formulation provides perfect nutrition for babies. It contains Probiotic Bifidobacterium M-16V, which makes the digestive system extremely healthy. Since switching to Aptamil, my baby has had fewer minor illnesses.', pros: ['Excellent probiotics, no constipation issues.', 'Rich in DHA for outstanding brain development.', 'Delicious and creamy taste.'], cons: ['High price point (premium segment).', 'Slightly hard to dissolve in cold water.'], imageColor: '#93c5fd' },
    7: { category: 'Stage 1 (0-6 months)', title: 'Nan Optipro Stage 1', rating: 4, date: 'June 10, 2026', author: 'Mommy Ken', content: 'Nestle\'s Nan Optipro is a popular choice due to its "cooling" properties and easy digestibility. With high-quality Optipro protein, babies absorb nutrients well without overwhelming their digestive tract. A safe and economical choice for the early months.', pros: ['Very cooling, rarely causes constipation.', 'Easily digestible, suitable for sensitive stomachs.', 'Affordable and widely available.'], cons: ['Slightly bland and fishy taste (due to micronutrients).', 'Slower weight gain compared to others.'], imageColor: '#86efac' },
    8: { category: 'Stage 3 (1+ years)', title: 'Pediasure Australia for Picky Eaters', rating: 5, date: 'June 15, 2026', author: 'Mommy Cam', content: 'A savior for picky eaters and underweight toddlers. Pediasure Australia provides high energy and abundant essential nutrients. I give it as a supplement in the evening and noticed significant weight gain after just 1 month. The vanilla flavor is very aromatic and moderately sweet.', pros: ['High energy content, promotes fast weight gain.', 'Extremely delicious taste, stimulates appetite.', 'Complete essential vitamins and minerals.'], cons: ['Too much energy; if used as a meal replacement, baby might refuse solid food.', 'Thicker and sweeter than regular formulas.'], imageColor: '#d8b4fe' },
    9: { category: 'Newborn', title: 'Interactive A-Frame Play Gym', rating: 5, date: 'July 01, 2026', author: 'Mommy Nam', content: 'An A-frame gym with cute hanging animals is essential for babies learning to reach and distinguish colors. The rattling sounds attract their attention, allowing them to play peacefully while mom does housework.', pros: ['BPA-free, safe ABS plastic.', 'Rounded edges, no sharp corners.', 'Easy to assemble and store.'], cons: ['Only suitable for babies under 6 months.', 'Some hanging parts are a bit too high.'], imageColor: '#fcd34d' },
    10: { category: 'Motor Skills', title: 'Safe Wooden Push Walker', rating: 4, date: 'July 05, 2026', author: 'Mommy Tho', content: 'This wooden walker with clacking birds is a great companion for toddlers taking their first steps. The design is very sturdy; it doesn\'t roll too fast, ensuring safety and building the baby\'s walking confidence.', pros: ['Anti-tip design, safe walking speed.', 'Fun clacking sound encourages pushing.', 'Durable natural wood with safe paint.'], cons: ['Slightly heavy compared to plastic walkers.', 'Cannot be folded for travel.'], imageColor: '#34d399' },
    11: { category: 'Cognitive', title: 'Lego Duplo Basic Set', rating: 5, date: 'July 10, 2026', author: 'Daddy Ken', content: 'Lego Duplo is always a worthwhile investment. The large bricks completely eliminate choking hazards. My child never gets bored, creatively building all sorts of shapes, which helps develop both spatial reasoning and dexterity.', pros: ['Large blocks, absolutely safe.', 'Vibrant colors, durable non-fading plastic.', 'Stimulates unlimited creativity.'], cons: ['Genuine sets can be quite expensive.', 'Requires buying multiple sets to build large models.'], imageColor: '#60a5fa' },
    12: { category: 'Cognitive', title: 'Montessori Cloth Book', rating: 5, date: 'July 15, 2026', author: 'Mommy Cao', content: 'Montessori cloth books are excellent tools for developing tactile senses and fine motor skills. Babies can touch, squeeze, button, and zip... Everything is soft and machine washable, truly a perfect educational toy.', pros: ['Soft fabric, prevents scratching.', 'Many fun activities (buttoning, tying bows, flipping).', 'Easily machine washable.'], cons: ['Baby might get bored once skills are mastered.', 'Easy to lose small attached pieces if not careful.'], imageColor: '#f472b6' }
  }
};

export default function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { allProducts } = useMockData();

  let data: any = null;

  // 1. Check local storage for newly approved reviews
  const approvedReviews = JSON.parse(localStorage.getItem('momo_approved_reviews') || '[]');
  const localReview = approvedReviews.find((r: any) => r.id === id || r.id === parseInt(id || '0'));
  
  if (localReview) {
    data = { ...localReview };
    data.date = new Date(localReview.date).toLocaleDateString('vi-VN');
    data.pros = localReview.pros ? localReview.pros.split('\n') : ['Sản phẩm tốt, đáng mua.'];
    data.cons = localReview.cons ? localReview.cons.split('\n') : ['Chưa thấy nhược điểm nào đáng kể.'];
    data.content = localReview.summary;
    data.title = localReview.productName || localReview.title;
    data.author = localReview.author ? localReview.author.split('@')[0] : 'Ẩn danh';
  } else {
    // 2. Check mock data
    const idNum = parseInt(id || '0');
    const mockData = (mockReviewDetails[language] as any)[idNum];
    if (mockData) {
      data = { ...mockData };
      const product = allProducts.find(p => p.id === idNum);
      if (product) {
        data.imageUrl = product.imageUrl;
      }
    }
  }

  if (!data) {
    return (
      <div className="page-transition container review-detail-not-found">
        <h2>{language === 'vi' ? 'Bài viết không tồn tại' : 'Article not found'}</h2>
        <button className="btn btn-outline review-detail-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> {language === 'vi' ? 'Quay lại' : 'Go Back'}
        </button>
      </div>
    );
  }

  return (
    <div className="page-transition review-detail-page">
      <SEO 
        title={data.title} 
        description={data.content.substring(0, 150) + '...'} 
        image={data.imageUrl}
        type="article"
      />
      <div 
        className="detail-banner" 
        style={{ 
          backgroundColor: data.imageColor,
          backgroundImage: data.imageUrl ? `url(${data.imageUrl})` : 'none',
        }}
      >
        <div className="container banner-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> {language === 'vi' ? 'Trở về' : 'Back'}
          </button>
          <span className="detail-category">{data.category}</span>
          <h1 className="detail-title">{data.title}</h1>
          <div className="detail-meta">
            <div className="card-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < data.rating ? "var(--accent)" : "transparent"} color="var(--accent)" />
              ))}
            </div>
            <span className="meta-divider">•</span>
            <span>{data.date}</span>
            <span className="meta-divider">•</span>
            <span>By <strong>{data.author}</strong></span>
          </div>
        </div>
      </div>

      <div className="container detail-content glass">
        <article className="main-article">
          <p>{data.content}</p>
          {data.imageUrl && (
            <div style={{ textAlign: 'center', margin: '32px 0' }}>
              <img 
                src={data.imageUrl} 
                alt={data.title} 
                style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', objectFit: 'contain', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} 
              />
            </div>
          )}
        </article>

        <div className="pros-cons-section">
          <div className="pros-box">
            <h3><CheckCircle2 color="#10b981" /> {language === 'vi' ? 'Ưu điểm (Pros)' : 'Pros'}</h3>
            <ul>
              {data.pros.map((pro: string, index: number) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          </div>
          
          <div className="cons-box">
            <h3><XCircle color="#ef4444" /> {language === 'vi' ? 'Nhược điểm (Cons)' : 'Cons'}</h3>
            <ul>
              {data.cons.map((con: string, index: number) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Affiliate Links Section */}
        <div className="affiliate-section">
          <h3 className="affiliate-title"><ShoppingBag size={20} /> {t('where_to_buy')}</h3>
          <div className="affiliate-buttons">
            <a href="https://shopee.vn" target="_blank" rel="noopener noreferrer" className="aff-btn btn-shopee">
              Mua tại Shopee
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="aff-btn btn-tiktok">
              Mua tại TikTok
            </a>
            <a href="https://lazada.vn" target="_blank" rel="noopener noreferrer" className="aff-btn btn-lazada">
              Mua tại Lazada
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
