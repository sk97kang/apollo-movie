import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
  mutation likeMovie($id: Int!) {
    likeMovie(id: $id) @client
  }
`;

const UNLIKE_MOVIE = gql`
  mutation unlikeMovie($id: Int!) {
    unlikeMovie(id: $id) @client
  }
`;

const Container = styled.div`
  height: 400px;
  border-radius: 7px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  background-color: transparent;
`;

const Poster = styled.div`
  background-image: url(${(props) => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

function Movie({ id, bg, isLiked }) {
  const [likeMovie] = useMutation(LIKE_MOVIE, {
    variables: { id: parseInt(id) },
  });
  const [unlikeMovie] = useMutation(UNLIKE_MOVIE, {
    variables: { id: parseInt(id) },
  });
  return (
    <Container>
      <Link to={`/${id}`}>
        <Poster bg={bg} />
      </Link>
      <button onClick={isLiked ? unlikeMovie : likeMovie}>
        {isLiked ? "Unlike" : "LIked"}
      </button>
    </Container>
  );
}

export default Movie;
