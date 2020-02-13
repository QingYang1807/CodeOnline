/**
 * 下拉框点击事件
 */
function select_click() {
    var select_value = document.getElementById("drop_down").value;
    setLanguageCode(select_value);
}

/**
 * 对页面内三个CodeMirror进行赋值(上面函数的升级综合)
 */
function DestoryAndCreateNew(code_content_num, str) {
    //1.找到textarea和后续div
    var text_area = document.getElementById("editor" + code_content_num);
    switch (code_content_num) {
        case 1:
            var code_mirror = document.getElementById("code_area").lastElementChild;
            var operate_area = document.getElementById("code_area");
            break;
        case 2:
            var code_mirror = document.getElementById("outText_console").lastElementChild;
            var operate_area = document.getElementById("outText_console");
            break;
        case 3:
            var code_mirror = document.getElementById("outText_result").lastElementChild;
            var operate_area = document.getElementById("outText_result");
    }

    //2.干掉textarea和后续div:CodeMirror
    if (text_area != null)
        text_area.remove();
    if (code_mirror != null)
        code_mirror.remove();
    //3.创建新结点<textarea>
    var new_textarea = document.createElement('textarea');
    new_textarea.setAttribute('name', 'editor' + code_content_num);
    new_textarea.setAttribute('id', 'editor' + code_content_num);
    new_textarea.setAttribute('style', 'display:none;');
    //追加结点
    operate_area.appendChild(new_textarea);
    //4.追加新CodeMirror
    var myTextarea = document.getElementById('editor' + code_content_num);
    var CodeMirrorEditor = CodeMirror.fromTextArea(myTextarea, {
        mode: "text/x-csrc",
        lineNumbers: true,     //在编辑器左侧显示行号。
        lineWrapping: "wrap",  //在长行时文字是换行(wrap)还是滚动(scroll)，默认为滚动(scroll)
        autofocus: true,       //初始化时自动获取焦点
        indentUnit: 4,         // 缩进单位为4
        matchBrackets: true,   // 括号匹配
        mode: 'htmlmixed',     // HMTL混合模式
        lineWrapping: true,    // 自动换行
        value: ''
    });
    //设置新值
    CodeMirrorEditor.setValue(str);
}

/**
 * run按钮事件
 */
function run() {
    //获取codeMirror中的值
    var code_area = document.getElementById("code_area");
    var list_span = code_area.getElementsByTagName('span');
    var code_value = "";
    var tempStr = "";

    for (var i = 0; i < list_span.length; i++) {
        tempStr = list_span[i].innerText;
        if (tempStr[tempStr.length - 1] == ">")
            code_value += list_span[i].innerText + "\n";
        else {
            code_value += list_span[i].innerText;
        }
    }

    //判断当前编码是何种语言。
    var select_value = document.getElementById("drop_down").value;
    var signBeforeIsSpace = true;//如果代码中第一个'#'字符之前为空格或回车，为true。否则，有其他字符，标为false。
    var isExitWell = false;//是否存在'#'号
    switch (select_value) {
        case "c":
            for (var i = 0; i < code_value.length; i++) {
                if (code_value[i] != '#') {
                    signBeforeIsSpace = false;
                }
                if (code_value[i] == '#') {
                    isExitWell = true;//有 # 号
                    // alert("'#'的当前位置(下标)为："+i+"\nsignBeforeIsSpace:"+signBeforeIsSpace);
                    if (signBeforeIsSpace == false) {
                        alert("'#'前面有不符合语法的字符，请检查语法错误！");
                        return;
                    }
                }
                //循环遇到int main()时，还没有匹配到#则已知代码中没有加入头文件，
                // 在用户代码前添加#include <stdio.h>
                if (code_value[i] == 'm' && code_value[i + 1] == 'a' && code_value[i + 2] == 'i' && code_value[i + 3] == 'n' && code_value[i + 4] == '(' && code_value[i + 5] == ')') {
                    if (isExitWell == false) {//说明没有 #号。
                        //给用户加上 #include<stdio.h>
                        code_value = "#include <stdio.h>\n" + code_value;
                        break;
                    }
                }
            }

            break;
        case "java":
            var fileName = "";
            for (var i = 0; i < code_value.length; i++) {
                if (code_value[i-1] == " " && code_value[i] == "c" && code_value[i + 1] == "l" && code_value[i + 2] == "a" && code_value[i + 3] == "s" && code_value[i + 4] == "s" && code_value[i + 5] == " ") {
                    i=i+6;
                    while (1) {
                        if (code_value[i]==" "||code_value[i]=="{")
                            break;
                        fileName += code_value[i];
                        i++;
                    }
                    break;
                }
            }
            break;
        default:
            break;
    }

    var finally_code_value = "";
    //将UTF-8转码Ascii
    var num = 0;
    var str = "";
    for (var count = 0; count < code_value.length; count++) {
        if (code_value[count].charCodeAt() == 160 || code_value[count].charCodeAt() == 302 || code_value[count].charCodeAt() == 240) {
            str = code_value[count];
            num = code_value[count].charCodeAt();
        } else {
            str = code_value[count];
            num = code_value[count].charCodeAt();
            finally_code_value += code_value[count];
        }
    }
    //code_valuealue.charCodeAt();

    var file_name = "";
    //只传名字，不传文件后缀
    var fileNoSuffix = "";

    if (select_value == 'java'){
        file_name = fileName;
        fileNoSuffix=fileName;
    }
    else {
        file_name = "code" + getTimeInYMDHMM();
        fileNoSuffix = file_name;
    }

    file_name += getSuffixByLanguage(select_value);

    //向服务器传数据
    // $.post("/ajaxExperiment", {
    //     codeValue: finally_code_value,
    //     fileName: file_name,
    //     fileNoSuffix: fileNoSuffix,
    //     whatLanguage: select_value,
    //     success: function (data) {
    //        alert(data);
    //     }
    // }, function () {
    //     //添加回调函数功能的地方
    //
    // });

    $(document).ready(function () {
        $.ajax({
            url: "/ajaxExperiment",
            dataType: "json",
            type: "post",
            async: false,
            data: {
                codeValue: finally_code_value,
                fileName: file_name,
                fileNoSuffix: fileNoSuffix,
                whatLanguage: select_value
            },
            success: function (result) {
                // alert("result="+result[0].runRestlt);
                var cmdRunProcessStr =
                    "cmd_str" + result[0].cmd_run_process.cmd_str +
                    "process_1: " + result[0].cmd_run_process.process_1 +
                    "process_2: " + result[0].cmd_run_process.process_2 +
                    "cmd_result: " + result[0].cmd_run_process.cmd_result;
                DestoryAndCreateNew(2, cmdRunProcessStr);
                DestoryAndCreateNew(3, result[0].runRestlt);
            }
        });
    });
}

/**
 * reSet按钮事件OK
 */
function reSet() {
    document.getElementById("reSet").onclick = function () {
        var select_value = document.getElementById("drop_down").value;
        setLanguageCode(select_value);
        DestoryAndCreateNew(2, "");
        DestoryAndCreateNew(3, "");
    }
}

/**
 * 重设reSet时，将下拉框中现在标识什么语言就相应重设编码区什么语言初始代码
 * 主要是设置编码区初始代码
 * 还可用于下拉框选择时更改编码区不同语言初始代码
 * OK
 * @param select_value
 */
function setLanguageCode(select_value) {
    switch (select_value) {
        case 'cp':
            DestoryAndCreateNew(1, getCodeByLanuage('cp'));
            break;
        case 'cs':
            DestoryAndCreateNew(1, getCodeByLanuage('cs'));
            break;
        case 'java':
            DestoryAndCreateNew(1, getCodeByLanuage('java'));
            break;
        case 'c':
            DestoryAndCreateNew(1, getCodeByLanuage('c'));
            break;
        case 'js':
            DestoryAndCreateNew(1, getCodeByLanuage('js'));
            break;
        case 'php':
            DestoryAndCreateNew(1, getCodeByLanuage('php'));
            break;
        case 'asp':
            DestoryAndCreateNew(1, getCodeByLanuage('asp'));
            break;
        case 'jsp':
            DestoryAndCreateNew(1, getCodeByLanuage('jsp'));
            break;
    }
}

/**
 * 通过相关语言，返回相关初始代码
 * @param lanuage
 * @returns {string}
 */
function getCodeByLanuage(lanuage) {
    switch (lanuage) {
        case 'cp':
            return '#include <stdio.h>\n' +
                '   int main(){\n' +
                '     cout << "Hello World!" << endl;\n' +
                '}';
            break;
        case 'cs':
            return 'cs null';
            break;
        case 'java':
            return 'public class InitialCode{\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("Hello World");\n' +
                '    }\t\n' +
                '}';
            break;
        case 'c':
            return '#include <stdio.h>\n' +
                'int main(){\n' +
                '    printf("%s","Hello World!");\n' +
                '}';
            break;
        case 'js':
            return 'js null';
            break;
        case 'php':
            return 'php null';
            break;
        case 'asp':
            return 'asp null';
            break;
        case 'jsp':
            return 'jsp null';
            break;
    }
}

/**
 * 将代码放在指定文件名称的txt文件中
 * @param filename
 * @param text
 */
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    } else {
        pom.click();
    }
}

/**
 * 通过传入语言，返回相关后缀
 */
function getSuffixByLanguage(language) {
    switch (language) {
        case 'cp'://C++
            return ".cpp";
            break;
        case 'cs'://C#
            return ".cs";
            break;
        case 'java':
            return ".java";
            break;
        case 'c':
            return ".c";
            break;
        case 'js':
            return ".js";
            break;
        case 'php':
            return ".php";
            break;
        case 'asp':
            return ".asp";
            break;
        case 'jsp':
            return ".jsp";
            break;
    }
}

/**
 * 下载按钮事件：用户点击下载相对应代码的文件到本地
 */
function downCodeFile() {
    document.getElementById("fileDownload").onclick = function () {
        var code_area = document.getElementById("code_area");
        var list_span = code_area.getElementsByTagName('span');
        var code_value = "";
        for (var i = 0; i < list_span.length; i++) {
            code_value += list_span[i].innerText;
        }
        var select_value = document.getElementById("drop_down").value;//获取下拉框目前选择语言
        var fileName = "code" + getTimeInYMDHMM();
        if (select_value == 'java')
            fileName = getClassName(code_value);
        fileName += getSuffixByLanguage(select_value);
        download(fileName, code_value);//传入什么语言，返回相关后缀，并下载文件
    }
}

/**
 * 获取时间方法一
 *  var date=new Date().Format("yyyy/MM/dd HH:mm:ss");
 console.log( date);
 VM588:2 2019/12/28 15:06:54
 * @param fmt
 * @returns {*}
 * @constructor
 */
//Date的prototype 属性可以向对象添加属性和方法。[未用到！]
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "S+": this.getMilliseconds()
    };
    //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
    if (/(y+)/.test(fmt)) {
        //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
        }
    }
    return fmt;
};

/**
 * 获取时间（年月日时分秒），例如20191228150852OK
 */
function getTimeInYMDHMM() {
    var time = new Date();
    var time_str = time.getFullYear() + "" + (time.getMonth() + 1) + time.getDate() +
        time.getHours() + time.getMinutes() + time.getSeconds();
    return time_str;
}

/**
 * 获取类名，用于生成文件名，java类名和文件名一致OK
 * @param code_value
 * @returns {string|string}
 */
function getClassName(code_value) {
    // var num1 = 0, num2 = 0;
    // var i = 0;
    // var className = "";
    // for (i; i < code_value.length; i++) {
    //     if (code_value[i] == '{') {
    //         num1 = i;
    //         break;
    //     }
    // }
    // for (i; i >= 0; i--) {
    //     if (code_value[i] == ' ') {
    //         num2 = i;
    //         break;
    //     }
    // }
    // num2 += 1;
    // for (num2; num2 < num1; num2++) {
    //     className += code_value[num2];
    // }
    for (var i = 0; i < code_value.length; i++) {
        if (code_value[i-1] == " " && code_value[i] == "c" && code_value[i + 1] == "l" && code_value[i + 2] == "a" && code_value[i + 3] == "s" && code_value[i + 4] == "s" && code_value[i + 5] == " ") {
            i=i+6;
            while (1) {
                if (code_value[i]==" "||code_value[i]=="{")
                    break;
                if(code_value[i]!=" ")
                    fileName += code_value[i];
                i++;
            }
            break;
        }
    }
    return fileName;
}


/*退出登录事件*/
function quitLogin() {
    var quit_login_btn = document.getElementById("quit_Login");
    quit_login_btn.onclick = function () {
        window.location.href = '/destroySession';
    }
}

function FirstPage() {
    window.location.href = "/coding.html";
}
