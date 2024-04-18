import { comment } from './interface/IComment';
import { getDateString } from './util/date';

function Comment(item: comment) {
  return (
    <article key={item.time}>
      {item.text.split('\n').map((line: string, idx: number, arr: string[]) => (
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
  );
}

export default Comment;
