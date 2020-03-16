import $ from 'jquery';
import axios from 'axios';

let isClose = true;

setInterval(() => {            
    if(getElementByXpath('//*[@id="react-root"]/div/div/div[1]/div[2]') != null) {
        if(isClose) {
            let Element = getElementByXpath('//*[@id="react-root"]/div/div/div[1]/div[2]/div/div/div/div/div/div/div[2]/a/div/div[2]/div[1]/span');

            let TextElement = getElementByXpath('//*[@id="react-root"]/div/div/div[1]/div[2]/div/div/div/div/div/div/div[3]');

            const id = $(Element).text().replace("@", "");

            getLastLog(id).then((id) => {
                const Bio = $(TextElement).text();                
                $(TextElement).html(`${Bio} <br/><br/> 마지막 교류 : ${id} `);
            }).catch(() => {                
                $(TextElement).html($(TextElement).text() + `<br/><br/> 교류한 적이 없습니다 :(...`);
            })

            
                                                                    
            isClose = false;        
        }                        
    } else {            
        if(!isClose) {
            console.log("CLOSE");                
            isClose = true;
        }            
    }     
}, 500);                            


function getLastLog(id){
    const url = 'https://mobile.twitter.com'
    return fetch(`${url}/search?q=%28from%3A${id}%29%20%28to%3Acheong_myeong__%29&f=live`, {
        method: "GET",
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
        }
    })
    .then((res) => {
        return res.text();
    }).then((res) => {
        const twt = $(res).find("#main_content > div > div.timeline > table:nth-child(1) > tbody > tr.tweet-header > td.timestamp > a").attr("href");        
        
        return fetch(`${url}${twt}`, {
            method: "GET",
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'
            }
        }).then((res) => {
            return res.text();
        }).then((res) => {            
            return $(res).find("#main-content > div > table > tbody > tr:nth-child(2) > td > div.metadata > a").text();            
        })
        
    });
}

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
