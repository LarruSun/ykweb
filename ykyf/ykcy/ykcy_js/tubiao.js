/**
 * Created by Administrator on 2017/2/8.
 */
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '菜单销量浏览'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation:0,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '销量'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '销量: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: '',
            data: [
                ['红烧排骨', 5430],
                ['红烧辣鸡', 5300],
                ['红烧肉', 4875],
                ['日本豆腐', 4658],
                ['白切鸡', 5635],
                ['肉末茄子',3634],
                ['鸭血粉', 3554],
                ['鸽子汤', 5542],
                ['乌鸡汤', 4658],
                ['三鲜汤', 2158]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});

$(function () {
    $('#container1').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '菜单销量浏览'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation:0,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '销量'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '销量: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: '',
            data: [
                ['红烧排骨', 6004],
                ['红烧辣鸡', 5300],
                ['红烧肉', 4875],
                ['日本豆腐', 4658],
                ['白切鸡', 5258],
                ['肉末茄子',2445],
                ['鸭血粉', 2848],
                ['鸽子汤', 3458],
                ['乌鸡汤', 4658],
                ['三鲜汤', 2158]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});

/*$(function () {
    $('#container2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '菜单销量浏览'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation:0,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '销量'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '销量: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: '',
            data: [
                ['红烧排骨', 5432],
                ['红烧辣鸡', 4534],
                ['红烧肉', 1658],
                ['日本豆腐', 3567],
                ['白切鸡', 6472],
                ['肉末茄子',1234],
                ['鸭血粉', 6452],
                ['鸽子汤', 2784],
                ['乌鸡汤', 1654],
                ['三鲜汤', 5457]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});

$(function () {
    $('#container3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '菜单销量浏览'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation:0,
                style: {
                    fontSize: '14px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '销量'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '销量: <b>{point.y:.1f}</b>'
        },
        series: [{
            name: '',
            data: [
                ['红烧排骨', 3452],
                ['红烧辣鸡', 2647],
                ['红烧肉', 2872],
                ['日本豆腐', 4527],
                ['白切鸡', 2546],
                ['肉末茄子',3249],
                ['鸭血粉', 5999],
                ['鸽子汤', 3999],
                ['乌鸡汤', 4534],
                ['三鲜汤', 2432]
            ],
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
});*/
