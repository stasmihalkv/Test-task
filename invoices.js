function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice[0].customer}:\n\n`;
    const format = new Intl.NumberFormat("ru-RU", {style: "currency", currency: "RUB",
minimumFractionDigits: 2}).format;

for (let perf of Object.keys(plays)){
    let play = plays[perf];
    let thisAmount = 0;
    
    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (play.audience > 30) {
                thisAmount += 1000 * (play.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (play.audience > 20) {
                thisAmount += 10000 + 500 * (play.audience - 20);
            }
            thisAmount += 300 * play.audience;
            // Дополнительный бонус за каждые 10 комедий
            volumeCredits += Math.floor(play.audience / 5);
            break;
            default:
                throw new Error(`неизвестный тип: ${play.type}`);
        }
   
    // Добавление бонусов
    volumeCredits += Math.max(play.audience - 30, 0);
     
    // Вывод строки счета
    result += `${play.playId}: ${format(thisAmount / 100)}\n`;
    result += `(${play.audience} мест)\n\n`;
    totalAmount += thisAmount;
    }
    result += `Итого с вас: ${format(totalAmount/100)}\n`;
    result += `Вы заработали: ${volumeCredits} бонусов`;
    return result;
   }

let invoice = [
    {
    "customer": "MDT",
    "perfomance": [
        {
        "playId": "Гамлет",
        "audience": 55,
        "type": "tragedy"
        },
        {
        "playId": "Ромео и Джульетта",
        "audience": 35,
        "type": "tragedy"
        },
        {
        "playId": "Отелло",
        "audience": 40,
        "type": "comedy"
        }  
    ]
    }
]

statement(invoice, invoice[0].perfomance)

