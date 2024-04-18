import { useQuery } from '@tanstack/react-query';
import './App.css';

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

  const getDateString = (dateString: string) => {
    const date = new Date(dateString);

    const formattedDate = date
      .toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      .replace(/\./g, ' -')
      .replace('T', ' ');

    return formattedDate;
  };

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
          <div className="flex flex-col justify-center items-center h-full">
            <h5 className="spin text-xs">세월호 10주기 추모주간</h5>
            <span className="spin text-[8rem]">🎗️</span>
            <h5 className="spin text-xs">기억을 불러오는 중</h5>
          </div>
        ) : (
          data &&
          data.map((item: { text: string; time: string }) => (
            <article key={item.time}>
              {item.text
                .split('\n')
                .map((line: string, idx: number, arr: string[]) => (
                  <p key={idx}>
                    {line}
                    {arr.length - 1 === idx && (
                      <span className="text-xs text-gray-500 pl-2">
                        {getDateString(item.time)}
                      </span>
                    )}
                  </p>
                ))}
            </article>
          ))
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
