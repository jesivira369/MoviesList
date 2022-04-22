import { useEffect, useState  } from "react";
import { Films } from "../utils/MockMovieList";
import StarsRating from "stars-rating";

const MovieListEdited = ({postedElements}) => {

    console.log(postedElements)

  return (
    <div name="editadas">
        <h1 className="text-4xl mt-20 sm:text-7xl font-bold text-[#08192f] ">Listado de Editadas</h1>
      <div className="w-full mt-[80px] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center py-4 ">
        {postedElements.map((item) => {
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
                  <p htmlFor="author" className="block my-2">
                    Autor de la pelicula
                  </p>
                  <p className="block my-2">{item.author.name}</p>
                </div>
              </div>
              <div className="px-6 py-4 flex flex-col justify-center items-center ">
                <p>Calificació: {item.rate}</p>
                <StarsRating
                  count={10}
                  value={item.rate}
                  size={15}
                  color2={"#ffd700"}
                  edit={false}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default MovieListEdited