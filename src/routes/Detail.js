import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      medium_cover_image
      description_intro
      language
      rating
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 80%;
  margin: auto;
  position: relative;
  top: -50px;
`;

function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <>
      <Container>
        <Column>
          <Title>{loading ? "Loading..." : data.movie.title}</Title>
          {!loading && data.movie && (
            <>
              <Subtitle>
                {data.movie.language} - {data.movie.rating}
              </Subtitle>
              <Description>{data.movie.description_intro}</Description>
            </>
          )}
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Container>
      <Movies>
        {data?.suggestions.map((movie) => (
          <Movie key={movie.id} id={movie.id} bg={movie.medium_cover_image} />
        ))}
      </Movies>
    </>
  );
}

export default Detail;
