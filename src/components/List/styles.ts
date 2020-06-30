import styled from 'styled-components'

interface ContainerProps {
  done: any;
};

export const Container = styled.div<ContainerProps>`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px; /* Shorthand to flex-grow, flex-shrink and flex-basis */
  opacity: ${props => (props.done ? 0.6 : 1)};

  &:nth-child(n + 2) {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 16px;
    }

    button {
      width: 42px;
      height: 42px;
      border-radius: 18px;
      background: #3b5bfd;
      border: 0;
      cursor: pointer;
    }
  }

  ul {
    padding-top: 30px;
  }
`
