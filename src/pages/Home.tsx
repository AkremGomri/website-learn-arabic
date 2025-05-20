import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Sparkles, Brain } from 'lucide-react';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
      <div className="max-w-4xl mx-auto pt-10 px-4 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-teal-700">
            تعلم العربية بطريقة ممتعة
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            تطبيق تفاعلي لمساعدة الأطفال على تعلم اللغة العربية من خلال الألعاب والأنشطة الممتعة.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-teal-600 p-4 flex justify-center">
              <Book className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-teal-700">أشكال الحروف</h3>
              <p className="text-gray-600 mb-4">
                تعلم كيفية كتابة الحروف العربية في مختلف أشكالها: في بداية الكلمة، وسطها، ونهايتها.
              </p>
              <Link to="/letter-forms">
                <Button variant="primary" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-purple-600 p-4 flex justify-center">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-purple-700">مولد الكلمات</h3>
              <p className="text-gray-600 mb-4">
                اختر الحروف التي تريد التدرب عليها، وسنقوم بإنشاء كلمات مخصصة لك.
              </p>
              <Link to="/word-generator">
                <Button variant="secondary" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="bg-orange-500 p-4 flex justify-center">
              <Brain className="h-16 w-16 text-white" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-orange-600">لعبة الذاكرة</h3>
              <p className="text-gray-600 mb-4">
                اختبر ذاكرتك! شاهد الكلمة ثم اختر الحروف بالترتيب الصحيح.
              </p>
              <Link to="/memory-game">
                <Button variant="accent" fullWidth>
                  ابدأ اللعب
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-teal-700">
            لماذا تعلم العربية مهم؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-teal-600">للأطفال</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>تنمية المهارات اللغوية في سن مبكرة</li>
                <li>تعزيز الهوية الثقافية والتراث</li>
                <li>تحسين القدرة على التواصل مع العائلة والأصدقاء</li>
                <li>فتح أبواب المعرفة للقراءة والكتابة بالعربية</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-teal-600">للآباء والمعلمين</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>أداة تعليمية تفاعلية سهلة الاستخدام</li>
                <li>طريقة ممتعة لتشجيع الأطفال على تعلم اللغة</li>
                <li>متابعة تقدم الطفل في تعلم الحروف والكلمات</li>
                <li>دعم المنهج التعليمي بأنشطة إضافية</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6 text-teal-700">
            ابدأ رحلة التعلم الآن!
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/letter-forms">
              <Button variant="primary" size="lg">
                تعلم أشكال الحروف
              </Button>
            </Link>
            <Link to="/word-generator">
              <Button variant="secondary" size="lg">
                مولد الكلمات
              </Button>
            </Link>
            <Link to="/memory-game">
              <Button variant="accent" size="lg">
                لعبة الذاكرة
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;