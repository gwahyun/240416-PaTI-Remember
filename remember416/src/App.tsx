import { useQuery } from '@tanstack/react-query';
import './App.css';
import Loader from './Loader';
import Comment from './Comment';
import { comment } from './interface/IComment';
function App() {
  const { isLoading, data } = useQuery({
    queryKey: ['getAnswer'],
    queryFn: async () => {
      const res = await fetch(
        'https://script.google.com/macros/s/AKfycbwGspg48JmQZzFvXUpjO9ouZV_TGLvvTbnngSmwFVxly7nkhLrrEW2b_DqFbw1kIB-L/exec',
      )
        .then(res => res.json())
        .then(res => res.data);

      return res;
    },
  });

  return (
    <>
      <header className="flex justify-between mb-6">
        <a href="http://www.pati.kr/">
          <img src="/assets/pati.webp" className="w-12" />
        </a>
        <h1 className="font-bold text-4xl text-stroke text-white ">
          파티 기억공간
        </h1>
      </header>
      <main className="border-4 h-5/6 border-black text-left break-all p-4 mb-6 overflow-y-scroll">
        {isLoading ? (
          <Loader />
        ) : (
          data && data.map((item: comment) => <Comment {...item} />)
        )}
      </main>
      <div className="flex justify-end">
        <a
          className="font-bold text-4xl text-stroke add text-white change"
          href="https://forms.gle/2rfvuwvqGxLo6isi6"
        >
          +기억 더하기
        </a>
      </div>
    </>
  );
}

export default App;
