console.clear();
var _data = JSON.parse(`{
    "lyrics":[
    
    {"line":"Ima, shizuka na yoru no naka de","time":750},
    
    {"line":"Mukeikaku ni kuruma wo hashiraseta","time":5500},
    
    {"line":"Hidari donari, anata no yokogao wo tsuki ga terashita","time":12600},

    {"line":"..","time":20000},

    {"line":"Tada","time":21000},

    {"line":"Omoide wo saguru you ni","time":23000},

    {"line":"Tadoru you ni kotoba wo tsunagi awasereba","time":27000},

    {"line":"Dou shiyou mo naku afurete kuru hibi no kioku","time":34000},

    {"line":"..","time":42000},

    {"line":"Anata no soba de ikiru to kimeta sono hi kara","time":43000},

    {"line":"Sukoshi zutsu kawari hajimeta sekai","time":49500},

    {"line":"Tsuyoku aru you ni yowasa wo kakusu you ni","time":54000},

    {"line":"Enjite kita hibi ni","time":59800},

    {"line":"..","time":64000},

    {"line":"Aru hi totsuzen arawareta sono manazashi ga","time":64500},

    {"line":"Shiranakatta koto oshiete kureta","time":71000},

    {"line":"Mamorubeki mono ga areba sore dake de","time":76000},

    {"line":"Konna ni mo tsuyoku narerunda","time":81000},

    {"line":"..","time":88000},

    {"line":"Fukai fukai kurayami no naka de","time":102000},

    {"line":"Deai, tomo ni sugoshite kita","time":107000},

    {"line":"Rui no nai hibi","time":111800},

    {"line":"Kokochi yokatta","time":114000},

    {"line":"Iya, shiawase datta","time":116000},

    {"line":"Tashika ni hora","time":119000},

    {"line":"Sukuwaretanda yo","time":120000},

    {"line":"Anata ni","time":123000},

    {"line":"..","time":124000},

    {"line":"Wazuka na hikari wo toraete kagayaita no wa","time":126000},

    {"line":"Marude nagareboshi no you na namida","time":132000},

    {"line":"Bukiyou na inochi kara nagarete kobore ochita","time":137000},

    {"line":"Utsukushii namida","time":142000},

    {"line":"..","time":149000},

    {"line":"Tsuyoku ooki na karada ni himeta yasashisa mo","time":150000},

    {"line":"Dokoka kurushige na sono kao mo","time":156000},

    {"line":"Itoshiku omounda","time":161000},

    {"line":"Sugata katachi janainda","time":164000},

	{"line":"Yatto kidzuitanda","time":166000},

	{"line":"..","time":170800},

	{"line":"Mujou ni hibiku juusei ga yoru wo hikisaku","time":171400},

	{"line":"Wakare no ibuki ga osoi kakaru","time":177800},

	{"line":"Setsuna ni kagayaita mujihi na nagareboshi","time":182800},

	{"line":"Inori wa tada todokazu ni kieta","time":188000},

	{"line":"..","time":192000},

	{"line":"Kono, te no naka de moetsukita","time":193000},

	{"line":"Kin'iro no yasashii suisei wo","time":198000},

	{"line":"Utsukushii tategami wo kurayami no naka nigirishimeta","time":204000},

	{"line":"..","time":214000},

	{"line":"Sekian dan Terimakasih by: eka","time":214000}



    
    ]}`);
var currentLine = "";

function align() {
    var a = $(".highlighted").height();
    var c = $(".content").height();
    var d = $(".highlighted").offset().top - $(".highlighted").parent().offset().top;
    var e = d + (a / 2) - (c / 2);
    $(".content").animate({ scrollTop: e + "px" }, { easing: "swing", duration: 250 });
}

var lyricHeight = $(".lyrics").height();
$(window).on("resize", function() {
    if ($(".lyrics").height() != lyricHeight) { //Either width changes so that a line may take up or use less vertical space or the window height changes, 2 in 1
        lyricHeight = $(".lyrics").height();
        align();
    }
});

$(document).ready(function() {
    $("video").on('timeupdate', function(e) {
        var time = this.currentTime * 1000;
        var past = _data["lyrics"].filter(function(item) {
            return item.time < time;
        });
        if (_data["lyrics"][past.length] != currentLine) {
            currentLine = _data["lyrics"][past.length];
            $(".lyrics div").removeClass("highlighted");
            $(`.lyrics div:nth-child(${past.length})`).addClass("highlighted"); //Text might take up more lines, do before realigning
            align();
        }
    });
});

generate();

function generate() {
    var html = "";
    for (var i = 0; i < _data["lyrics"].length; i++) {
        html += "<div";
        if (i == 0) {
            html += ` class="highlighted"`;
            currentLine = 0;
        }
        if (_data["lyrics"][i]["note"]) {
            html += ` note="${_data["lyrics"][i]["note"]}"`;
        }
        html += ">";
        html += _data["lyrics"][i]["line"] == "" ? "•" : _data["lyrics"][i]["line"];
        html += "</div>"
    }
    $(".lyrics").html(html);
    align();
}