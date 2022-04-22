import { useEffect, useState } from "react";
import { Films } from "../utils/MockMovieList";
import { eliminaDuplicados } from "../utils/arrayfilter";
import Axios from "axios";
import StarsRating from "stars-rating";
import axios from "axios";
import Swal from "sweetalert2";
import MovieListEdited from "./MovieListEdited";

const MovieList = () => {
  const [list, setList] = useState([]);
  const [editedElements, setEditedElements] = useState([]);
  const [showPosted, setshowPosted] = useState(false);
  const [postedElements, setPostedElements] = useState([]);

  useEffect(() => {
    Axios({
      url: "https://jsonplaceholder.typicode.com/posts",
    })
      .then((response) => {
        setList(response.data);
        setList(Films);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const shuffle = (array) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const handleClickRandon = () => {
    setList(shuffle([...list]));
  };

  const editElementsArray = (id) => {
    let arrtemp = [...editedElements];
    arrtemp.push(id);
    setEditedElements(eliminaDuplicados(arrtemp));
  };

  const onChangeRate = (id, value) => {
    const index = list.findIndex((x) => x.id === id);
    if (index != -1) {
      let arr = [...list];
      arr[index].rate = value;
      setList(arr);

      editElementsArray(id);
    }
  };

  const handleClickDuplicated = (id) => {
    const index = list.findIndex((x) => x.id === id);
    if (index != -1) {
      let arr = [...list];
      let duplicated = { ...arr[index] };
      duplicated.id = arr.length + 1;
      arr.push(duplicated);
      setList(arr);
    }
  };

  const onChangeAuthor = (id, value) => {
    const index = list.findIndex((x) => x.id === id);
    if (index != -1) {
      let arr = [...list];
      arr[index].author.name = value;
      setList(arr);

      editElementsArray(id);
    }
  };

  const handleClickPost = () => {
    if (editedElements.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Parece que no has editado ningun elemento!",
        footer: '<a href="/">Why do I have this issue?</a>',
      });
    }

    editedElements.forEach((id) => {
      const index = list.findIndex((x) => x.id === id);
      if (index != -1) {
        let arr = [...list];
        let data = { ...arr[index] };

        axios
          .post(`https://jsonplaceholder.typicode.com/users`, { data })
          .then((res) => {
            console.log(res);

            setPostedElements([...postedElements, data])

            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Se ha enviado la actualizacion al servidor",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((res) => {
            console.log(res);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ha habido un problema",
              footer: '<a href="/">Why do I have this issue?</a>',
            });
          });
      }

      setshowPosted(!showPosted);
    });
  };

  return (
    <div name="originales">
      <h1 className="text-4xl mt-20 sm:text-7xl font-bold text-[#08192f] ">
        Listado de peliculas
      </h1>
      <div className="w-full mt-[80px] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4 ">
        {list.map((item) => {
          return (
            <div
              className="max-w-sm rounded overflow-hidden shadow-lg h-full flex flex-col justify-between"
              key={item.id}
            >
              <div>
                <img className="w-full" src={item.url_image} alt="Test image" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">
                    Titulo: {item.name}
                  </div>
                  <label htmlFor="author" className="block my-2">
                    Autor de la pelicula
                  </label>
                  <select
                    className="block mx-auto w-3/4 pl-3 pr-10 py-2 transition duration-100 ease-in-out border border-1 rounded-lg shadow-sm focus:border-green-2000 focus:border-2 focus:shadow-md focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-black placeholder-gray-400 bg-white border-gray-300"
                    placeholder="Autor de la pelicula"
                    name="author"
                    id="author"
                    onChange={(e) => onChangeAuthor(item.id, e.target.value)}
                    defaultValue={item.author.name}
                  >
                    <option value="Martin Scorsese">Martin Scorsese</option>
                    <option value="Steven Spielberg">Steven Spielberg</option>
                    <option value="Isao Takahata">Isao Takahata</option>
                    <option value="Federico Fellini">Federico Fellini</option>
                    <option value="Hayao Miyazaki">Hayao Miyazaki</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4 flex flex-col justify-center items-center ">
                <label htmlFor="rate">Editar calificación</label>
                <input
                  className="text-center"
                  value={item.rate}
                  type="number"
                  name="rate"
                  min={1}
                  max={10}
                  step="0.5"
                  onChange={(e) => onChangeRate(item.id, e.target.value)}
                />
                <StarsRating
                  count={10}
                  value={item.rate}
                  size={15}
                  color2={"#ffd700"}
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-3/4 mx-auto mb-2"
                onClick={() => handleClickDuplicated(item.id)}
              >
                Duplicar
              </button>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 ml-2 border border-blue-700 rounded w-1/4 mx-auto mb-2"
          onClick={handleClickRandon}
        >
          Aleatorio
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded w-1/4 mx-auto mb-2"
          onClick={handleClickPost}
        >
          Enviar editados
        </button>
      </div>
        {postedElements.length !== 0 ? (
          <MovieListEdited postedElements={postedElements} />
        ) : null}
    </div>
  );
};

export default MovieList;
