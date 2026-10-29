
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

const searchInput = document.querySelector("#search-input");
const searchMessage = document.querySelector("#search-message");

let selectedCategory = "all";

// 記事を絞り込む関数
function filterArticles() {

    const keyword = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function(card) {

        const category = card.dataset.category;
        const keywords = card.dataset.keywords || "";

        const title = card.querySelector("h3").textContent;
        const description = card.querySelector("p").textContent;

        const searchText =
            (title + " " + description + " " + keywords)
            .toLowerCase();

        const matchesCategory =
            selectedCategory === "all" ||
            selectedCategory === category;

        const matchesKeyword =
            searchText.includes(keyword);

        if (matchesCategory && matchesKeyword) {
            card.classList.remove("hidden");
            visibleCount++;
        } else {
            card.classList.add("hidden");
        }

    });

    if (visibleCount === 0) {
        searchMessage.textContent =
            "該当する記事がありません。";
    } else {
        searchMessage.textContent =
            "検索結果：" + visibleCount + "件";
    }
}

// カテゴリーボタンのクリック処理
buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedCategory = button.dataset.filter;

        buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterArticles();
    });

});

// 検索ボックスの入力処理
searchInput.addEventListener("input", function() {
    filterArticles();
});

// ページを開いたときに実行
filterArticles();
