import React from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, View, Easing, SectionList } from 'react-native';


const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { scrollY: new Animated.Value(0) };
    this.animatedValue = new Animated.Value(0);
  }
 
  componentDidMount() {
    this._animateImage()
  }

  _animateImage() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        // easing: Easing.linear 
        easing: Easing.circle
      }
    ).start(() => this._animateImage());
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  }

  _renderHeaderSection() {
    return (
      <View style={styles.scrollViewContent}>
          <View style={styles.row}>
            <Text>HEADERRR</Text>
          </View>
      </View>
    )
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE/2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -150],
      extrapolate: 'clamp',
    });
    const spin = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: ['0deg', '360deg'],
      extrapolate: 'clamp',
    });
    const imageRight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-250, 250]
    });


    return (
      <View style={styles.fill}>

        <SectionList
          stickySectionHeadersEnabled
          sections={[
            {title: 'Title1', data: ['item1', 'item2']},
            {title: 'Title2', data: ['item3', 'item4']},
            {title: 'Title3', data: ['item5', 'item6']},
          ]}
          renderItem={this._renderScrollViewContent}
          renderSectionHeader={this._renderHeaderSection}
          keyExtractor={(item, i) => (Math.random()*100).toString()}
          scrollEventThrottle={16} 
          onScroll={ Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
        >
        </SectionList>

        {/* <ScrollView 
          style={styles.fill} 
          scrollEventThrottle={16} 
          onScroll={ Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}
        >
          {this._renderScrollViewContent()}
        </ScrollView> */}
        <Animated.View style={[styles.header, { height: headerHeight }]}> 
          <Animated.Image
            style={[
              styles.backgroundImage,
              {opacity: imageOpacity, transform: [{translateY: imageTranslate}, {rotate: spin}]},
            ]}
            source={require('./images/cat.jpg')}
          />
          <View style={styles.bar}>
            <Text style={styles.title}>Title</Text>
          </View>
        </Animated.View>

        {/* <Animated.Image
          style={[
            styles.floatingImage,
            {transform: [{translateX: imageRight}]}
          ]}
          source={require('./images/cat.jpg')}
        > 

        </Animated.Image> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  floatingImage: {
    position: 'absolute',
    top: 300, 
    width: 250,
    height: 150,
  }
});

export default App;
