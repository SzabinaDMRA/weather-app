const apiKey = "eb238d89343e93d712117590721e26ff";                                                                      // apiKey değişkenini tanımla
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";                                       //apiUrl değişkenini tanımla 

const searchBox = document.querySelector(".search input");                                                              // searchBox diye değişken tanımla, querzSelector yardımı ile, .search input CSS seçiciyle eşleşen ilk öğeyi döndürür
const searchBtn = document.querySelector(".search button");                                                             // searchBtn diye değişken tanımla, querzSelector yardımı ile, .search input CSS seçiciyle eşleşen ilk öğeyi döndürür
const weatherIcon = document.querySelector(".weather-icon");                                                            // weatherIcon diye değişken tanımla, querzSelector yardımı ile, .search input CSS seçiciyle eşleşen ilk öğeyi döndürür

async function checkWeather(city){                                                                                      // checkWeather fonskiyonunu tanımla ve async ile fonksiyondaki öğeler sırayla işlenir ve işlem sırasının bitmesi beklenir (async -> Fonksiyonun bekletilebileceğini belirtir.) 
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);                                                    // response değikenini tanımla, (await -> async fonksiyonun işi için akışı bekletir), ve veri gönderme işlemlerinde kullanılan bir yapıdır, şehiri (city) belirttiğimiz zaman url içine yapıştırır ve aratır. 

    if(response.status == 404){                                                                                         // eğer response değişken 404 hata kodu (not found) verirse eğer, yani yazdığımız "city", şehir yanlışsa yada bulunamıyorsa eğer,
        document.querySelector(".error").style.display = "block";                                                       // .error CSS özelliklerini al ve, sadece error mesajı görünsün, ama derece yada iconlar gözükmesin (şehir bulunamıyorsa, yada yanlış yazıldıysa, iconları vs gösterme)
        document.querySelector(".weather").style.display = "none";                                                      // .weather css özelliklerini al ve, şehir bilgisi yanlışsa eğer, dereceyi ve diğer iconları gösterme
    }else{                                                                                                              //eğer response değişken 404 hata kodu (not found) vermezse, yani true değer dönerse
        var data = await response.json();                                                                               // data değişkenini tanımla ve, json methodu sayseinde text dönsün

        document.querySelector(".city").innerHTML = data.name;                                                          // .city css özellikleri dönsün ve şehir verisi ile eşleşsin
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";                                  // .temp css özellikleri dönsün ve derece ismisi ile eşleşsin + °C ekle 
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";                                       // .humidity css özellikleri dönsün ve humidity verisi ile eşleşsin + % ekle
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";                                          // .wind css özellikleri dönsün ve rüzgar verisi ile eşleşsin + km/h ekle
    
        if(data.weather[0].main == "Clouds"){                                                                           // eğer weather değeri (hava durumu), main değerinin içinde, "Clouds" ise, clouds.png fotoğrafını ekle
            weatherIcon.src = "images/clouds.png"                                                                       //clouds.png fotoğrafını ekle
        }
        else if(data.weather[0].main == "Clear"){                                                                       // eğer weather değeri (hava durumu), main değerinin içinde, "Clear" ise, clouds.png fotoğrafını ekle
            weatherIcon.src = "images/clear.png"                                                                        //cleads.png fotoğrafını ekle
        }
        else if(data.weather[0].main == "Rain"){                                                                        // eğer weather değeri (hava durumu), main değerinin içinde, "Rain" ise, clouds.png fotoğrafını ekle
            weatherIcon.src = "images/rain.png"                                                                         //rain.png fotoğrafını ekle
        }
        else if(data.weather[0].main == "Drizzle"){                                                                     // eğer weather değeri (hava durumu), main değerinin içinde, "Dizzle" ise, clouds.png fotoğrafını ekle
            weatherIcon.src = "images/drizzle.png"                                                                      //drizzle.png fotoğrafını ekle
        }
        else if(data.weather[0].main == "Mist"){                                                                        // eğer weather değeri (hava durumu), main değerinin içinde, "Mist" ise, clouds.png fotoğrafını ekle
            weatherIcon.src = "images/mist.png"                                                                         //mist.png fotoğrafını ekle
        }
    
        document.querySelector(".weather").style.display = "block";                                                     // .error CSS özelliklerini al ve, sadece error mesajı görünsün, ama derece yada iconlar gözükmesin (şehir bulunamıyorsa, yada yanlış yazıldıysa, iconları vs gösterme)
        document.querySelector(".error").style.display = "none";                                                        // .weather css özelliklerini al ve, şehir bilgisi yanlışsa eğer, dereceyi ve diğer iconları gösterme
    }
}

searchBtn.addEventListener("click", ()=>{                                                                               // Arama buttonuna (searchBtn) click özelliği ekle, (bas)
    checkWeather(searchBox.value); 
});

checkWeather();                                                                                                         // fonksiyonu çalıştır