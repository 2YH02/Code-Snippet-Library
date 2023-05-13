import styled from "styled-components";

const Container = styled.div`
  border-right: 1px solid rgba(100, 100, 100, 0.7);
  padding: 0 20px;
`;

const Aside = () => {
  return (
    <Container>
      <h1>사이드바임</h1>
    </Container>
  );
};

export default Aside;
