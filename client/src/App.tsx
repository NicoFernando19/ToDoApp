import { useState } from 'react';
import Form from './components/Form';
import Header from './components/Header';
import PlusButton from './components/PlusButton';
import TaskList from './components/TaskList';

function App() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
      <Header />
      <TaskList />
      <Form inProp={showForm} onClose={() => setShowForm(false)} />
      <PlusButton onClick={() => setShowForm(true)} />
    </div>
  );
}

export default App;
