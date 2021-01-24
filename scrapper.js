const puppeteer = require('puppeteer');


// This is a function that scrapes relevant information given the correct url.
async function scrape(url) {
    const browser = await puppeteer.launch({    ignoreDefaultArgs: ["--disable-extensions","--enable-automation"],
});
    const page = await browser.newPage();
    await page.goto(url);
    
    // Scrapes the current price 
    const[el] = await page.$x('//*[@id="priceblock_ourprice"]');
    const src = await el.getProperty('textContent')
    const price = await src.jsonValue();
    
    // Scrapes the title of the item
    const[ele] = await page.$x('//*[@id="productTitle"]');   // Copy x path of the element
    const txt2 = await ele.getProperty('textContent')
    const Txt2 = await txt2.jsonValue();    
    var title = Txt2.replace(/[\n\r\t]/g,"");  //Reomoves unneccessary new lines in json string
    
    // Scrapes the img of the item
    const[el2] = await page.$x('//*[@id="landingImage"]');
    const imag = await el2.getProperty('src')
    const img = await imag.jsonValue(); 

    // Scrapes the tags of the item so sorting can be done
    const[el3] = await page.$x('//*[@id="wayfinding-breadcrumbs_feature_div"]/ul/li[1]/span/a');
    const cat = await el3.getProperty('textContent')
    const Cat = await cat.jsonValue(); 
    var category = Cat.replace(/[\n\r\t]/g,"").trim(); 

    console.log({price, title, img, category});

    browser.close();
}
//var currentLocation = window.location.hrf;  // Gets the current url 
//scrape(currentLocation);

//returns the resulst for a list of urls
var links = ['https://www.amazon.ca/Razer-DeathAdder-Lighting-Programmable-Rubberized/dp/B082G5SPR5/ref=sr_1_2_sspa?crid=AU7ULJMOW16J&dchild=1&keywords=razer&qid=1611457074&sprefix=razer%2Caps%2C183&sr=8-2-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFXRFhWTUw5NEdVS1UmZW5jcnlwdGVkSWQ9QTA3MjQxOTgySDAwNlo0WVVXVDBKJmVuY3J5cHRlZEFkSWQ9QTA5NTE2MDlMSk5JMFZPTEE0NUYmd2lkZ2V0TmFtZT1zcF9hdGYmYWN0aW9uPWNsaWNrUmVkaXJlY3QmZG9Ob3RMb2dDbGljaz10cnVl','https://www.amazon.ca/GIFT-Japanese-Assortment-OHIMESAMA-Selection/dp/B072PWS148/?_encoding=UTF8&pd_rd_w=9WgKf&pf_rd_p=c580b54b-2982-4737-91ac-c7cb862ee724&pf_rd_r=K2RJG8FD3EW7DPXWEHKZ&pd_rd_r=e316ae31-18d0-4de4-aaf0-0115881ece72&pd_rd_wg=SpEdD&ref_=pd_gw_trq_n2gl', 'https://www.amazon.ca/dp/B07WZMJPWQ/ref=redir_mobile_desktop?_encoding=UTF8&aaxitk=Wswx6it552.9f93sKBPvlg&hsa_cr_id=3380639660701&pd_rd_plhdr=t&pd_rd_r=54bc3e29-ec28-473c-95b4-1092cda0531c&pd_rd_w=HnOlf&pd_rd_wg=UuH76&ref_=sbx_be_s_sparkle_mcd_asin_0_img','https://www.amazon.ca/dp/B08HRQV5V8/ref=sspa_dk_detail_1?psc=1&pd_rd_i=B08HRQV5V8&pd_rd_w=aauTh&pf_rd_p=8e6e247b-e5c3-4098-977f-c4bb73284c4f&pd_rd_wg=vJUdF&pf_rd_r=JKNDXMY43QW47PBYPW5J&pd_rd_r=109c157c-c620-473c-92cc-06ed95075c5f&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyRkhOSUMxNjFJUlk1JmVuY3J5cHRlZElkPUEwNTY0NjYyMTZNVUdWRzBISlRHRyZlbmNyeXB0ZWRBZElkPUEwMzgzNTk2MjRLOVFYM1A3OVdIRCZ3aWRnZXROYW1lPXNwX2RldGFpbCZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU='];
var i;
for (i = 0; i < links.length; i++ ) {
    scrape(links[i]);
}
