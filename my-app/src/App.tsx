import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './Pages/counter/Counter';
import Memo from './components/Memo/Memo';
import Carasoul from './components/CaraSoul/Carasoul';
import Callback from './components/Callback/Callback';
import SearchBar from './components/SearchBar/SearchBar';
import Todo from './Pages/counter/Todo/Todo';
import FileUpload from './Pages/fileUpload/fileUpload';
import SearchComponent from './Pages/Search/Search';
import TestComponent from './Pages/Test/Test';

// Usage in a component
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TestComponent />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/file-upload" element={<FileUpload />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/memo" element={<Memo />} />
          <Route path="/carasoul" element={<Carasoul />} />
          <Route path="/call-back" element={<Callback />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
