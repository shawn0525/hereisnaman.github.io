import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import config from '../config';

import styled from 'styled-components';
import { theme, mixins, media, Section, A } from '../style';

const HeroContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const Hi = styled.h1`
  color: ${theme.colors.green};
  margin: 0 0 20px 3px;
  font-size: ${theme.fontSizes.medium};
  font-family: ${theme.fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${theme.fontSizes.small};`};
  ${media.tablet`font-size: ${theme.fontSizes.smallish};`};
`;
const Name = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const Subtitle = styled.h3`
  font-size: 80px;
  line-height: 1.1;
  color: ${theme.colors.slate};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const Blurb = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  a {
    ${mixins.inlineLink};
  }
`;
const EmailButton = styled.div``;
const EmailLink = styled(Link)`
  ${mixins.bigButton};
  font-size: ${theme.fontSizes.smallish};
  margin-top: 50px;
`;

class Hero extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };

  state = {
    show: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ show: true }), 1000);
  }

  render() {
    const { data } = this.props;
    const { show } = this.state;
    const { node } = data[0];

    const one = () => <Hi style={{ transitionDelay: '100ms' }}>{node.frontmatter.title}</Hi>;
    const two = () => <Name style={{ transitionDelay: '200ms' }}>{node.frontmatter.name}.</Name>;
    const three = () => (
      <Subtitle style={{ transitionDelay: '300ms' }}>{node.frontmatter.subtitle}</Subtitle>
    );
    const four = () => (
      <Blurb style={{ transitionDelay: '400ms' }} dangerouslySetInnerHTML={{ __html: node.html }} />
    );
    const five = () => (
      <EmailButton style={{ transitionDelay: '500ms' }}>
        <EmailLink to="/about/">About me</EmailLink>
      </EmailButton>
    );

    const items = [one, two, three, four, five];

    return (
      <HeroContainer>
        <TransitionGroup>
          {show &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={3000}>
                {item}
              </CSSTransition>
            ))}
        </TransitionGroup>
      </HeroContainer>
    );
  }
}

export default Hero;
