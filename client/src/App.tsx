import Form from './components/Form';
import Header from './components/Header';
import PlusButton from './components/PlusButton';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="container relative bg-darkPurple mx-auto max-w-lg p-4 box-border min-h-screen">
      <Header />
      <TaskList />
      {/* <Form /> */}
      <PlusButton />
    </div>
  );
}

export default App;
