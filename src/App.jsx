import React, { useState } from 'react';

const data0 = [
  {
    id: 1,
    title: '天気について',
    text: '今日は晴れのち曇りで、午後から小雨の可能性があります。',
    done: false,
  },
  {
    id: 2,
    title: '開発環境の整備',
    text: 'ViteとReactを使えば、素早く開発を始められます。',
    done: false,
  },
  {
    id: 3,
    title: '作業効率を上げるコツ',
    text: 'タスクを小さく分けて、一つずつこなすことで集中力が保てます。',
    done: false,
  },
  {
    id: 4,
    title: 'おすすめのエディタ拡張',
    text: 'PrettierやESLintを入れるとコードが整って書きやすくなります。',
    done: false,
  },
];

function App() {
  const [data, setData] = useState(data0); // 配列データの状態
  const [showForm, setShowForm] = useState(false); // 「新しく追加の入力欄」の状態
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');

  const dataCount = data.length;

  function handleToggle(id) {
    setData(curData =>
      curData.map(curData =>
        curData.id === id ? { ...curData, done: !curData.done } : curData
      )
    );
  }

  function handleDelete(id) {
    setData(data => data.filter(data => data.id !== id));
  }

  function handleShowForm() {
    setShowForm(cur => !cur);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim() || !title.trim()) return;

    const nextId = Math.max(...data.map(cur => cur.id)) + 1;
    setData(cur => [...cur, { id: nextId, title, text, done: false }]);

    setText('');
    setTitle('');
    setShowForm(false);
  }

  return (
    <div>
      <Accordion data={data} onDelete={handleDelete} onToggle={handleToggle} />
      <Button onClick={handleShowForm} showForm={showForm}>
        {showForm ? '閉じる' : '新しく追加をする'}
      </Button>
      {showForm && (
        <AddAccordionItem
          text={text}
          title={title}
          onText={setText}
          onTitle={setTitle}
          onSubmit={handleSubmit}
        />
      )}
      <Counter dataCount={dataCount} />
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Accordion({ data, onDelete, onToggle }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div>
      {data.map(el => (
        <AccordionItem
          el={el}
          key={el.id}
          openId={openId}
          isOpen={openId === el.id}
          // trueなら開いている falseなら閉じる
          onOpen={() =>
            setOpenId(currentOpenId => (currentOpenId === el.id ? null : el.id))
          }
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

function AccordionItem({ el, isOpen, onDelete, onOpen, onToggle }) {
  return (
    <div className="accordion-item">
      <div className={`header ${isOpen ? 'open' : ''}`}>
        <input type="checkbox" onChange={() => onToggle(el.id)} />
        <span>{el.id}.</span>
        <p className={el.done ? 'done' : ''}>{el.title}</p>
      </div>
      <p>{isOpen ? el.text : ''}</p>
      <p onClick={onOpen}>{isOpen ? '-' : '+'}</p>
      <Button onClick={() => onDelete(el.id)}>削除</Button>
    </div>
  );
}

function AddAccordionItem({ text, title, onText, onTitle, onSubmit }) {
  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={e => onTitle(e.target.value)}
        />
        <label>コンテンツ</label>
        <input
          type="text"
          value={text}
          onChange={e => onText(e.target.value)}
        />
        <Button>追加</Button>
      </form>
    </div>
  );
}

function Counter({ dataCount }) {
  if (dataCount < 1) return;
  return (
    <div>
      <p>
        現在<strong>{dataCount}</strong>個のアイテムがあります
      </p>
    </div>
  );
}

function DataSort() {}

export default App;
