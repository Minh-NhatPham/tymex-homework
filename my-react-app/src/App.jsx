import { useState } from "react";
import { Flex, Layout } from "antd";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchBox from "./components/search";
import CardList from "./listings/CardList";
import Sidebar from "./components/Sidebar";
import SearchPage from "./pages/SearchPage";

function App() {
  const [count, setCount] = useState(0);
  const { Sider, Header, Footer, Content } = Layout;
  return (
    <>
      <Flex>
        <Layout>
          <SearchPage />
        </Layout>
      </Flex>
    </>
  );
}

export default App;
