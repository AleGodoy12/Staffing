import Sidebar from "./Sidebar"
import '../assets/css/Home.css'
import Header from "./Header"


export default function Home() {
  
  return (
    <>
      <main className="main-home">
        <Sidebar></Sidebar>
        <section className="section-right">
          <Header></Header>
        </section>
      </main>
    </>
  );
}