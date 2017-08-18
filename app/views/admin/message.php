<script src="/public/js/jquery.jqote2.min.js"></script>
<script src="/public/js/message.adm.js"></script>
<section id="sec-message">
  <div class="container">
    <?php if ($_SESSION['admin']) : ?>
      <div class="container">
        <label>問題列表</label>
        <div id="message-list" style="width:75%;height:300px;border:solid;overflow:auto">
          <ul style="background-color:#efe9e9">
            <li><input type="radio" name="and">請勾選回覆</li>
            <li>Q:請問怎麼查詢填報內容？</li>
            <li>提問者：國立交通大學/語言中心華語組/NCTU1</li>
            <li>提問時間：2017/08/11 10:03:12</li>
          </ul>
          <ul style="background-color:#FFFFFF">
            <li><input type="radio" name="and">請勾選回覆</li>
            <li>Q:請問怎麼查詢填報內容？</li>
            <li>提問者：國立交通大學/語言中心華語組/NCTU1</li>
            <li>提問時間：2017/08/13 16:03:12</li>
          </ul>
          <ul style="background-color:#efe9e9">
            <li><input type="radio" name="and">請勾選回覆</li>
            <li>Q:請問怎麼查詢填報內容？</li>
            <li>提問者：國立交通大學/語言中心華語組/NCTU1</li>
            <li>提問時間：2017/08/15 11:03:12</li>
          </ul>
        </div>
        <div id="message-form">
          <div style="width:75%">
            <label>回覆問題</label>
            <textarea style="width:100%;height:60px;"></textarea>
          </div>
          <div style="width:75%;text-align:center">
            <button id="message-cancel">取消</button>
            <button id="message-save">確認回覆</button>
          </div>
        </div>
      </div>
    <?php endif;?>
  </div>
</section>

