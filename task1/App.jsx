import MapView, {Circle, Marker} from 'react-native-maps'
import {View, Button, ScrollView, Modal, Text, TouchableOpacity} from 'react-native'
import {useState, useEffect} from 'react'
import * as Location from 'expo-location'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'
import axios from 'axios'
import AntDesign from 'react-native-vector-icons/AntDesign'

import NewsCard from './src/components/NewsCard'

const mapsKey = 'AIzaSyDRwEXKkQntJ5lrDL3XPUQAaZeKeXWUP9o'
const newsApiKey = '91ed854002d744e3826695ce703d0168'
const defaultNews = [
  {
      "source": {
          "id": null,
          name: "Moz.com"
      },
      "author": "Tom Capper",
      "title": "Metrics for Better Keyword Research — Whiteboard Friday",
      "description": "In today’s Whiteboard Friday, Tom explains some of the common mistakes SEOs make when doing keyword research that are easy to fix, many of which come from metrics like search volume, click-through rate, and difficulty.",
      "url": "https://moz.com/blog/keyword-research-metrics-whiteboard-friday",
      "urlToImage": "https://moz.com/images/cms/WBF-KWResearchMetrics-Thumbnail-1.png?w=1200&h=630&q=82&auto=format&fit=crop&dm=1666903259&s=2e1d2c754aa85c3299826b03d44fd988",
      "publishedAt": "2022-10-28T07:00:00Z",
      "content": "The author's views are entirely his or her own (excluding the unlikely event of hypnosis) and may not always reflect the views of Moz.Many SEOs think of keyword research as a very basic part of SEO, … [+7324 chars]"
  },
  {
      "source": {
          "id": null,
          name: "VentureBeat"
      },
      "author": "Sean Michael Kerner",
      "title": "Vectara’s AI-based neural search-as-a-service challenges keyword-based searches",
      "description": "Vectara, formerly ZIR AI, has emerged from stealth with $20M in seed funding, offering AI-based neural search-as-a-service technology.",
      "url": "https://venturebeat.com/ai/vectaras-ai-based-neural-search-as-a-service-challenges-keyword-based-searches/",
      "urlToImage": "https://venturebeat.com/wp-content/uploads/2022/10/GettyImages-search_search-engine_connected_network_1400992296-e1665532643283.jpg?w=1200&strip=all",
      "publishedAt": "2022-10-12T11:00:00Z",
      "content": "To further strengthen our commitment to providing industry-leading coverage of data technology, VentureBeat is excited to welcome Andrew Brust and Tony Baer as regular contributors. Watch for their a… [+1380 chars]"
  },
  {
      "source": {
          "id": null,
          name: "Entrepreneur"
      },
      "author": "Pulkit Agrawal",
      "title": "6 SEO Myths Every Business Owner Should Ignore",
      "description": "Believing these six SEO myths will likely cause more harm than good to any business.",
      "url": "https://www.entrepreneur.com/growing-a-business/6-seo-myths-every-business-owner-should-ignore/436540",
      "urlToImage": "https://assets.entrepreneur.com/content/3x2/2000/1666638413-GettyImages-855281144.jpg",
      "publishedAt": "2022-10-27T18:30:00Z",
      "content": "Let us be honest, every business owner tries to keep up with the ever-changing Google algorithm. Why? Because nobody wants to be on the second page of Google. In SEO, quick victories with little effo… [+6254 chars]"
  },
  {
      "source": {
          "id": null,
          name: "Moz.com"
      },
      "author": "Dave Westby",
      "title": "Uncover Your Most Valuable Keywords with Aira’s New Keyword Opportunity Estimation Tool",
      "description": "When you have a list of keywords, it’s often tricky to know where you could potentially rank, what levels of traffic you can earn, and how this relates to conversions and revenue. To help, Dave walks you through Aira’s new Keyword Opportunity Estimation Tool …",
      "url": "https://moz.com/blog/keyword-opportunity-estimation-tool",
      "urlToImage": "https://moz.com/images/blog/banners/advanced-seo-74da3a3_2021-03-16-234126.png?w=1200&h=630&q=82&auto=format&fit=clip&dm=1615939768&s=2674911f82cb896f72d1041864062a69",
      "publishedAt": "2022-10-03T07:00:00Z",
      "content": "The author's views are entirely his or her own (excluding the unlikely event of hypnosis) and may not always reflect the views of Moz.Whether speaking to senior management or just trying to figure ou… [+14059 chars]"
  },
  {
      "source": {
          "id": null,
          name: "ReadWrite"
      },
      "author": "Angel Martins",
      "title": "How To Optimize Your WordPress Website for SEO in 2022",
      "description": "WordPress has become a preferred platform for businesses of all sizes and industries. This is because of its user-friendly nature and relatively simple maintenance features. Along with the plentiful options of plugins and themes available for users to customi…",
      "url": "https://readwrite.com/how-to-optimize-your-wordpress-website-for-seo-in-2022/",
      "urlToImage": "https://images.readwrite.com/wp-content/uploads/2022/09/Optimize-WordPress-Website.jpg",
      "publishedAt": "2022-10-20T18:00:59Z",
      "content": "WordPress has become a preferred platform for businesses of all sizes and industries. This is because of its user-friendly nature and relatively simple maintenance features. Along with the plentiful … [+8841 chars]"
  },
  {
      "source": {
          "id": null,
          name: "Search Engine Journal"
      },
      "author": "Moz",
      "title": "3 Ways To Unlock Keyword Gold",
      "description": "Learn how to add efficiency & effectiveness to your SEO keyword research process & discover golden opportunities to rank higher on SERPs.\nThe post 3 Ways To Unlock Keyword Gold appeared first on Search Engine Journal.",
      "url": "https://www.searchenginejournal.com/unlock-keyword-gold-moz-spcs/468065/",
      "urlToImage": "https://cdn.searchenginejournal.com/wp-content/uploads/2022/10/featured-image-634db1364bdf8-sej.jpg",
      "publishedAt": "2022-10-27T05:00:04Z",
      "content": "Keyword research is often thought of as the keystone of SEO and provides the foundation for many SEO strategies. After all, how can you optimize your website for search engines if you don’t know what… [+3571 chars]"
  },
  {
      "source": {
          "id": null,
          name: "Search Engine Journal"
      },
      "author": "John Lincoln",
      "title": "How To Use Google Ads Keyword Forecast Tool For Predictive Keyword Research via @sejournal, @johnelincoln",
      "description": "Learn how to use the Keyword Planner tool so your PPC and SEO efforts can work together.\nThe post How To Use Google Ads Keyword Forecast Tool For Predictive Keyword Research appeared first on Search Engine Journal.",
      "url": "https://www.searchenginejournal.com/google-ads-keyword-forecast-tool/453068/",
      "urlToImage": "https://cdn.searchenginejournal.com/wp-content/uploads/2022/06/google-ads-6304c8b263c4f-sej.png",
      "publishedAt": "2022-10-20T11:45:59Z",
      "content": "The Google Ads Keyword Planner is a useful tool; there’s no doubt about that.\r\nWhether you’re starting your first Google Ads campaign or your hundredth campaign, having a plan or forecast is critical… [+9814 chars]"
  },
  {
      "source": {
          "id": null,
          name: "Entrepreneur"
      },
      "author": "Timothy Carter",
      "title": "How to Optimize for Competitor Brand Keywords (and Why You Should)",
      "description": "Why is this strategy powerful and how can you use it effectively?",
      "url": "https://www.entrepreneur.com/growing-a-business/how-to-optimize-for-competitor-brand-keywords/429426",
      "urlToImage": "https://assets.entrepreneur.com/content/3x2/2000/1666193309-GettyImages-1159619657.jpg",
      "publishedAt": "2022-10-25T12:00:00Z",
      "content": "Most people see search engine optimization (SEO) as a kind of solitaire. You work entirely in isolation, improving your website and offsite references to maximize your results. To some extent, this i… [+5695 chars]"
  },
  {
      "source": {
          "id": "reuters",
          name: "Reuters"
      },
      "author": "Reuters Fact Check",
      "title": "Fact Check-Fabricated Lauren Boebert quote about slavery and unemployment - Reuters",
      "description": "Republican Congresswoman Lauren Boebert did not say “the lowest black unemployment rate was during slavery,” as claimed on social media. The Twitter account that appears to have originally posted the alleged statement has previously shared satirical tweets.",
      "url": "https://www.reuters.com/article/factcheck-boebert-unemployment-idUSL1N31Q261",
      "urlToImage": "https://s1.reutersmedia.net/resources_v2/images/rcom-default.png?w=800",
      "publishedAt": "2022-10-25T18:14:00Z",
      "content": "Republican Congresswoman Lauren Boebert did not say the lowest black unemployment rate was during slavery, as claimed on social media. The Twitter account that appears to have originally posted the a… [+1612 chars]"
  }
]
const defaultPlaces = [
  {
      geometry: {
          location: {
              lat: 57.53125290000001,
              lng: 25.4083677
          },
          viewport: {
              northeast: {
                  lat: 57.55511522746887,
                  lng: 25.46775791000855
              },
              southwest: {
                  lat: 57.49749290181028,
                  lng: 25.37464166284285
              }
          }
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Valmiera",
      photos: [
          {
              height: 1080,
              html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/103988576868560251541\">Amanda Geidāne</a>"
              ],
              photo_reference: "AcYSjRj5hY8vYUHgENYqPb2okDSsb_AUE8WuYFuTRLaR-WONaocyVUejBzokZvK2Z6ncfMNU0G78DdR1gjKk_qNPXVFwY_EgSg76h-RhnYewCI88QPyRN2CiC0dg4AqSxPeXbSYOwbVc2I6ZRL4x9XL1Pyn57zzALFOXA-pnzY0V3nh6KhVW",
              width: 1620
          }
      ],
      "place_id": "ChIJB8iYJYPu60YRAATzaM3PAAQ",
      "reference": "ChIJB8iYJYPu60YRAATzaM3PAAQ",
      "scope": "GOOGLE",
      "types": [
          "locality",
          "political"
      ],
      "vicinity": "Valmiera"
  },
  {
      business_status: "OPERATIONAL",
      geometry: {
          location: {
              lat: 57.5567474,
              lng: 25.4424819
          },
          viewport: {
              northeast: {
                  lat: 57.55812598029151,
                  lng: 25.4439053802915
              },
              southwest: {
                  lat: 57.55542801970849,
                  lng: 25.4412074197085
              }
          }
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "AVOTI, holiday complex",
      photos: [
          {
              height: 3024,
              html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/104513668356125938921\">Laura Liepa</a>"
              ],
              photo_reference: "AcYSjRhmLD2IOHPtCmXIDsA1xAjDnvxNabSVzowPAqEGfYXkxDthnFWXHjVfcBdAVCEB-ZBBiU6l0o3XwenQW4oz3KLBq7ngnCG8ZkLtl6wyC5yYDwrh23C8TkRGdDzXrqa_av4a8L0yEjsLWSOKZp5swndBBfCAvpdZhhfzrhySsmh97NMW",
              width: 3024
          }
      ],
      "place_id": "ChIJg9d-Lkjs60YRdeJhhHYkyKg",
      "plus_code": {
          "compound_code": "HC4R+MX Valmiera, Valmieras pilsēta, Latvia",
          "global_code": "9G97HC4R+MX"
      },
      "rating": 4.5,
      "reference": "ChIJg9d-Lkjs60YRdeJhhHYkyKg",
      "scope": "GOOGLE",
      "types": [
          "point_of_interest",
          "establishment"
      ],
      "user_ratings_total": 155,
      "vicinity": "Avotu iela, Valmiera"
  },
  {
      business_status: "OPERATIONAL",
      geometry: {
          location: {
              lat: 57.5276489,
              lng: 25.3905429
          },
          viewport: {
              northeast: {
                  lat: 57.52905018029151,
                  lng: 25.3918066302915
              },
              southwest: {
                  lat: 57.52635221970849,
                  lng: 25.3891086697085
              }
          }
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
      icon_background_color: "#909CE1",
      icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/hotel_pinlet",
      name: "Sports Hotel",
      opening_hours: {
          open_now: true
      },
      photos: [
          {
              height: 1080,
              html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/105606550888850065730\">Sports Hotel</a>"
              ],
              photo_reference: "AcYSjRhnaSuU7GYx-OBTRVH6BPpW8OartS3lCWoQURRTVnROS-sndRzmhfbiPUNe_drWdSxDk5dYiBKcl1BHi1c3xIhMUML9oJiErXfeP7Ef4SYwN1R7dYaZdw5jPJ2bRZCjZkGExK43bKmjq0P9EEY-TBszPuZeCKLghh1LHbHWtmTcKVoU",
              width: 1920
          }
      ],
      "place_id": "ChIJ42xNAWPu60YRPWX6BulnEwA",
      "plus_code": {
          "compound_code": "G9HR+36 Valmiera, Valmieras pilsēta, Latvia",
          "global_code": "9G97G9HR+36"
      },
      "rating": 4.2,
      "reference": "ChIJ42xNAWPu60YRPWX6BulnEwA",
      "scope": "GOOGLE",
      "types": [
          "lodging",
          "point_of_interest",
          "establishment"
      ],
      "user_ratings_total": 279,
      "vicinity": "Vaidavas iela 15, Valmiera"
  },
  {
      business_status: "OPERATIONAL",
      geometry: {
          location: {
              lat: 57.53423309999999,
              lng: 25.46891399999999
          },
          viewport: {
              northeast: {
                  lat: 57.5355435302915,
                  lng: 25.4703019302915
              },
              southwest: {
                  lat: 57.53284556970848,
                  lng: 25.46760396970849
              }
          }
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/camping-71.png",
      icon_background_color: "#4DB546",
      icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/camping_pinlet",
      name: "Baiļi",
      photos: [
          {
              height: 3024,
              html_attributions: [
                  "<a href=\"https://maps.google.com/maps/contrib/105468807836483440030\">Martti Paju</a>"
              ],
              photo_reference: "AcYSjRhszvZYMLN0fHb-H1QQiclED5sAUSzX7xisJwQ4qo_WDtl-1tzYKBfBQsPNJCcWSG5aceSEZJnRcKoDLWD0si8nWK_cXXGTAV165lQ663MaH1PciOCc2oKEXJ_3TXgTTn9EIoXORZRlRDHHofdQD3VZ2h4NtMipJsfxlDZtW8uMGLLM",
              width: 4032
          }
      ],
      "place_id": "ChIJawhPKRvs60YRDakDSN9ChQo",
      "plus_code": {
          "compound_code": "GFM9+MH Valmiera, Valmieras pilsēta, Latvia",
          "global_code": "9G97GFM9+MH"
      },
      "rating": 4.3,
      "reference": "ChIJawhPKRvs60YRDakDSN9ChQo",
      "scope": "GOOGLE",
      "types": [
          "campground",
          "park",
          "lodging",
          "point_of_interest",
          "establishment"
      ],
      "user_ratings_total": 322,
      "vicinity": "Latvia"
  }
]

const App = () => {

  const [pos, setPos] = useState()
  const [news, setNews] = useState([...defaultNews])
  const [isInNews, setIsInNews] = useState(false)
  const [isModal, setIsModal] = useState(false)
  const [places, setPlaces] = useState([...defaultPlaces])
  const [placeMarker, setPlaceMarker] = useState()

  useEffect(() => {
    if (pos !== undefined) {return}

    getCurrentPositionAsync()
    // getNews()
  }, [])

  useEffect(() => {if (pos !== undefined) {getPlaces()}}, [pos])

  const getCurrentPositionAsync = async () => {
    let location = await Location.getCurrentPositionAsync({})

    setPos({latitude: location?.coords?.latitude, longitude: location?.coords?.longitude})
  }

  // amount of calls per 12 hours is low so won't go here too much
  const getNews = () => {
    axios.get('https://newsapi.org/v2/everything?q=keyword&apiKey=' + newsApiKey)
      .then((res) => handleGetNews(res?.data?.articles))
  }

  // called in getNews()
  const handleGetNews = (data) => {
    let newNews = [...data]

    newNews = newNews.slice(0, 10)
    setNews(newNews)
  }

  const getPlaces = () => {
    // axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + mapsKey +
    // '&location=' + pos?.latitude + ','+ pos?.longitude + '&radius=5000&type=restaurant,bank')
    //   .then((res) => console.log('res:', res?.data?.results))
  }

  const handlePlaceMarker = (location) => {
    setPlaceMarker({latitude: location?.lat, longitude: location?.lng})
    setIsModal(false)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        {/* places modal */}
        <Modal visible={isModal} transparent>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#55555555'}}
            onTouchEnd={() => setIsModal(false)}
          >
            <View
              style={{height: '75%', width: '75%', backgroundColor: 'white', borderRadius: 15}}
              onTouchEnd={(e) => e.stopPropagation()}
            >
              <ScrollView
                contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
                showsVerticalScrollIndicator={false}
              >
                {places?.map((elem, i) => (
                  <TouchableOpacity
                    key={i}
                    activeOpacity={0.8}
                    style={{marginTop: i === 0 ? 15 : 0, marginBottom: 15, padding: 15,
                      backgroundColor: 'black', borderRadius: 15
                    }}
                    onPress={() => handlePlaceMarker(elem?.geometry?.location)}
                  >
                    <Text style={{fontSize: 15, color: 'white'}}>{elem?.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {/* top bar */}
        <View style={{display: 'flex', flexDirection: 'row', padding: 15,
          justifyContent: 'center'
        }}>
          <View style={{flex: 1, marginRight: 15, backgroundColor: 'black'}}>
            <Button color='black' title='MAP' onPress={() => setIsInNews(false)} />
          </View>
          <View style={{flex: 1}}>
            <Button color='black' title='NEWS' onPress={() => setIsInNews(true)} />
          </View>
        </View>
        <View style={{width: '100%', height: 2, backgroundColor: 'gray'}} />
        {
          isInNews
          ?
          <View style={{flex: 1}}>
            <ScrollView
              contentContainerStyle={{backgroundColor: 'gray', padding: 15}}
              showsVerticalScrollIndicator={false}
            >
              {news?.map((elem, i) => (
                <NewsCard
                  key={i}
                  style={{marginBottom: i !== news?.length - 1 ? 15 : 0}}
                  author={elem?.author}
                  title={elem?.title}
                  url={elem?.url}
                  pic={elem?.urlToImage}
                />
              ))}
            </ScrollView>
          </View>
          :
          // map body
          <View style={{flex: 1, height: '100%', width: '100%'}}>
            {
              pos !== undefined &&
              <MapView
                style={{height: '100%', width: '100%'}}
                initialRegion={{
                  latitude: pos?.latitude,
                  longitude: pos?.longitude,
                  latitudeDelta: 0,
                  longitudeDelta: 0.5
                }}
              >
                <Marker
                  coordinate={{latitude: pos?.latitude, longitude: pos?.longitude}}
                  title={'You\'re here'}
                />
                {
                  placeMarker !== undefined &&
                  <Marker
                    coordinate={{latitude: placeMarker?.latitude, longitude: placeMarker?.longitude}}
                  />
                }
                <Circle
                  center={{latitude: pos?.latitude, longitude: pos?.longitude}}
                  radius={8000}
                  strokeWidth={5}
                  strokeColor='#FF0000'
                />
              </MapView>
            }
            {/* modal activation button */}
            <TouchableOpacity
              style={{position: 'absolute', bottom: 10,
                right: 10, backgroundColor: 'black', padding: 15, borderRadius: 15
              }}
              activeOpacity={0.8}
              onPress={() => setIsModal(true)}
            >
              <AntDesign name='pushpin' color='white' size={40} />
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App