document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const frameImages = document.querySelectorAll(".frame_select img");
    const modalBox = document.querySelector(".modal_content");
    const hashtagInput = document.getElementById("hashtag_input");
    const hashtagList = document.getElementById("hashtag_list");
    const imageUploadText = document.getElementById('image_upload_text');
    const customCard = document.getElementById('custom_card');
    const startCalendar = document.getElementById('start_calendar');
    const lastCalendar = document.getElementById('last_calendar');
    const itemName = document.getElementById("item_name");
    const select = document.getElementById('category_select');
    const newCategoryInput = document.getElementById('new_category_input');
    const addOptionButton = document.getElementById('add_option_button');

    // 모달 열기
    frameImages.forEach((img) => {
        img.addEventListener("click", () => {
            modal.style.display = "flex";
            document.body.style.overflow = "hidden";
        });
    });


    // const modalContent = document.querySelector(".modal_content");

    // modalContent.style.zIndex = "1003";
    // customCard.style.zIndex = "1002";

    // modal_content의 위치를 custom_card 위로 조정
    // 모달 닫기
    modal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    });

    // 모달 내부 클릭 이벤트 전파 차단
    modalBox.addEventListener("click", (event) => {
        event.stopPropagation();
    });


    // 해시태그 입력 처리
    hashtagInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // 기본 Enter 키 동작 방지
            let inputValue = hashtagInput.value.trim();

            if (inputValue) {
                let hashtag = "#" + inputValue;
                let hashtagElement = document.createElement("span");
                hashtagElement.classList.add("hashtag");
                hashtagElement.textContent = hashtag;
                hashtagList.appendChild(hashtagElement);
                hashtagInput.value = "";
            }
        }
    });

    hashtagInput.addEventListener("input", () => {
        let inputValue = hashtagInput.value;
        if (!inputValue.startsWith("#")) {
            hashtagInput.value = "#" + inputValue;
        }
    });

    // 프레임 선택 감지
    document.querySelectorAll('.frame_select img').forEach((frame) => {
        frame.addEventListener('click', function () {
            const selectedFrame = this.alt;

            customCard.classList.remove('white-frame', 'full-frame', 'small-frame');
            if (selectedFrame === 'white frame') {
                customCard.classList.add('white-frame');
            } else if (selectedFrame === 'full image') {
                customCard.classList.add('full-frame');
            } else if (selectedFrame === 'small image') {
                customCard.classList.add('small-frame');
            }

            updateImageUploadSection(selectedFrame);
        });
    });

    // 이미지 업로드 처리
    imageUploadText.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.click();

        input.addEventListener('change', function () {
            const file = input.files[0];
            if (file) {
                console.log('파일이 업로드되었습니다:', file.name);
                const customCardImg = document.getElementById('custom_card_img');
                customCardImg.src = URL.createObjectURL(file);
            }
        });
    });

    function updateImageUploadSection(frame) {
        if (frame === 'full image') {
            imageUploadText.style.display = 'block';
        } else {
            imageUploadText.style.display = 'block';
        }
    }

    // 날짜 선택 처리
    flatpickr("#start_calendar", {
        enableTime: false,
        dateFormat: "Y-m-d",
        onChange: function (selectedDates, dateStr) {
            startCalendar.dataset.date = dateStr;
            startCalendar.innerHTML = `<img src="/image/CalendarCheck.png" alt=""> ${dateStr} 부터`;
        }
    });

    flatpickr("#last_calendar", {
        enableTime: false,
        dateFormat: "Y-m-d",
        onChange: function (selectedDates, dateStr) {
            lastCalendar.dataset.date = dateStr;
            lastCalendar.innerHTML = `<img src="/image/CalendarCheck.png" alt=""> ${dateStr} 까지`;
        }
    });


    // // 아이템 이름 수정 처리
    // itemName.addEventListener("click", function () {
    //     const currentText = itemName.innerHTML.replace('<br>', '\n');
    //     const input = document.createElement("input");
    //     input.type = "text";
    //     input.value = currentText;
    //     input.style.width = "100%";
    //     input.style.border = "none";
    //     input.style.fontSize = "20px";
    //     itemName.innerHTML = "";
    //     itemName.appendChild(input);

    //     input.addEventListener("blur", function () {
    //         const updatedText = input.value.replace(/\n/g, '<br>');
    //         itemName.innerHTML = updatedText;
    //     });

    //     input.focus();
    // });
    // 아이템 이름 수정 처리
    itemName.addEventListener("click", function () {
        itemName.contentEditable = true; // contenteditable 속성으로 텍스트를 수정 가능하게 만듦
        itemName.focus();
    });

    itemName.addEventListener("blur", function () {
        itemName.contentEditable = false; // 수정이 끝나면 수정 불가능하게 만듦
    });

    // 마지막 날짜 변경 처리
    lastCalendar.addEventListener('change', handleLastCalendarChange);

    function handleLastCalendarChange() {
        const startDate = startCalendar.dataset.date;
        const endDate = lastCalendar.dataset.date;

        if (startDate && endDate) {
            if (new Date(startDate) > new Date(endDate)) {
                showPopup("시작 날짜는 종료 날짜보다 이전이어야 합니다.");
            } else {
                closePopup();
            }
        }
    }

    // 팝업 처리
    function showPopup(message) {
        const popup = document.getElementById('errorPopup');
        popup.style.display = 'flex';
        popup.querySelector('p').textContent = message;
    }

    function closePopup() {
        const popup = document.getElementById('errorPopup');
        popup.style.display = 'none';
    }

    // 카테고리 선택 및 추가 처리
    select.addEventListener('change', handleCategoryChange);

    // addOptionButton.addEventListener('click', addNewCategory);

    function handleCategoryChange() {
        if (select.value === "add_new") {
            newCategoryInput.style.display = "block";
        } else {
            newCategoryInput.style.display = "none";
        }
    }

    function addNewCategory() {
        const addOptionButton = document.getElementById("addOptionButton");
        const categorySelect = document.getElementById("category_select");
        const newCategoryInput = document.getElementById("new_category");

        addOptionButton.addEventListener("click", () => {
            const newCategoryValue = newCategoryInput.value.trim();
            if (newCategoryValue) {
                const newOption = document.createElement("option");
                newOption.value = newCategoryValue;
                newOption.textContent = newCategoryValue;
                categorySelect.appendChild(newOption);
                categorySelect.value = newCategoryValue; // 새 옵션 선택
                newCategoryInput.value = ""; // 입력 필드 초기화
            }
        });
    }
    // 텍스트 요소들
    const textElements = [
        document.getElementById("item_name"),
        document.getElementById("item_ment"),
        document.getElementById("hashtag_input"),
        document.getElementById("image_upload_text"),
    ];
    console.log(itemName);

    // 색상 버튼 요소들
    const colorOptions = document.querySelectorAll(".colors");
    // 색상 선택 처리
    colorOptions.forEach(color => {

        color.addEventListener("click", () => {
            const selectedColor = color.getAttribute("data-color");

            // 텍스트 요소들의 색상 변경
            textElements.forEach(element => {
                // 텍스트 색상
                element.style.color = selectedColor;

                // textarea인 경우 placeholder 색상 변경
                if (element.tagName.toLowerCase() === 'textarea' || element.tagName.toLowerCase() === 'input') {
                    element.style.color = selectedColor; // 텍스트 색상 변경
                    // placeholder 색상 변경
                    element.style.setProperty('--placeholder-color', selectedColor);
                }
            });
        });
    });




});

// 이미지를 감싼 컨테이너와 이미지 선택
const frameSelect = document.querySelector(".frame_select");
const images = document.querySelectorAll(".frame_select img");

// 이벤트 리스너 추가
images.forEach((img) => {
    img.addEventListener("mouseover", () => {
        // 모든 이미지 초기화
        images.forEach((image) => image.classList.remove("center"));

        // 마우스를 가져다 댄 이미지에 'center' 클래스 추가
        img.classList.add("center");

        // 정렬 조정: 마우스를 가져다 댄 이미지를 가운데로 이동
        const index = Array.from(images).indexOf(img);

        // 이미지를 정렬하기 위해 순서를 조정
        frameSelect.style.justifyContent = index === 0
            ? "flex-start"
            : index === images.length - 1
                ? "flex-end"
                : "center";
    });
});
