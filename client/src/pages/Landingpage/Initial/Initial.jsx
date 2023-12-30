import React from "react";
import Discover from "../../Homepage/Discover/Discover";
import * as IcoIcons from "react-icons/im";
import Animation from "../Animation";
import "./Initial.css";
import TopBar from "../../../Components/TopBar/TopBar";
import BookUpload from "../../BookUpload/BookUpload";
import Footer from "../../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
function Topbar() {
  const navigate = useNavigate();
  const search = async (e) => {
    navigate(`/search?query=${e.target.query.value}`);
  };

  return (
    <Animation>
      <div>
        <TopBar home={true} />

        <div className="hero">
          <p className="hero-text">Unlock Knowledge</p>
          <p className="hero-description">
            With PageCrafts's online library of books, academic texts and tools,
            trusted by students worldwide.
          </p>
          <div className="box-container">
            <table className="element-container">
              <tr>
                <td>
                  <form onSubmit={search}>
                    <input
                      type={"text"}
                      name="query"
                      placeholder="Search by title, author, ISBN & topic"
                      className="search"
                    ></input>
                    <input type={"submit"} hidden />
                  </form>
                </td>
                <td>
                  <p className="search-logo">
                    <i>
                      <IcoIcons.ImSearch />
                    </i>
                  </p>
                </td>
              </tr>
            </table>
          </div>

          <div className="showoff">
            <div className="sitem">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3389/3389081.png"
                alt="books"
              />
              <p>Unlimited access to 900,000 books</p>
            </div>

            <div className="sitem">
              <img
                src="https://cdn-icons-png.flaticon.com/512/718/718970.png"
                alt="books"
              />
              <p>Over 950 Topics and subtopics to choose from</p>
            </div>

            <div className="sitem">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2443/2443649.png"
                alt="books"
              />
              <p>Save your time using our built in Ebook Tools</p>
            </div>

            <div className="sitem">
              <img
                src="https://cdn-icons-png.flaticon.com/512/896/896317.png"
                alt="books"
              />
              <p>Read anytime, anywhere, on any device</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footerinitial">
        <Footer />
      </div>
    </Animation>
  );
}

export default Topbar;
