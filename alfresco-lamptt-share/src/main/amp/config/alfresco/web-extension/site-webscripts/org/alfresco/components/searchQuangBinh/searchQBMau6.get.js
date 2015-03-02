/**
 * Advanced Search component GET method
 */

function main() {
    var result = remote.connect("alfresco").get("/zalu/report/1");
    if (result.status == 200) {
        var data = eval('(' + result + ')');
        model.data = data;
        var key, count = 0;
        for (key in data.items) {
            if (data.items.hasOwnProperty(key)) {
                count++;
            }
        }
        model.count = count;
    } else
        model.count = 0;


}

main();
