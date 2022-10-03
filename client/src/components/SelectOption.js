import React from "react";
import { Select } from "semantic-ui-react";

function SelectOption() {
  const genre = [
    { key: "", value: "", text: "장르선택" },
    { key: "1", value: "1", text: "드라마" },
    { key: "2", value: "2", text: "판타지" },
    { key: "3", value: "3", text: "서부" },
    { key: "4", value: "4", text: "공포" },
    { key: "5", value: "5", text: "로맨스" },
    { key: "6", value: "6", text: "모험" },
    { key: "7", value: "7", text: "스릴러" },
    { key: "8", value: "8", text: "느와르" },
    { key: "9", value: "9", text: "컬트" },
    { key: "10", value: "10", text: "다큐멘터리" },
    { key: "11", value: "11", text: "코미디" },
    { key: "12", value: "12", text: "가족" },
    { key: "13", value: "13", text: "미스터리" },
    { key: "14", value: "14", text: "전쟁" },
    { key: "15", value: "15", text: "애니메이션" },
    { key: "16", value: "16", text: "범죄" },
    { key: "17", value: "17", text: "뮤지컬" },
    { key: "18", value: "18", text: "SF" },
    { key: "19", value: "19", text: "액션" },
    { key: "20", value: "20", text: "무협" },
    { key: "21", value: "21", text: "에로" },
    { key: "22", value: "22", text: "서스펜스" },
    { key: "23", value: "23", text: "서사" },
    { key: "24", value: "24", text: "블랙코미디" },
    { key: "25", value: "25", text: "실험" },
    { key: "26", value: "26", text: "카툰" },
    { key: "27", value: "27", text: "음악" },
  ];

  const country = [
    { value: "", text: "국가선택" },
    { value: "KR", text: "한국" },
    { value: "FR", text: "프랑스" },
    { value: "GB", text: "영국" },
    { value: "HK", text: "홍콩" },
    { value: "JP", text: "일본" },
    { value: "US", text: "미국" },
    { value: "ETC", text: "기타" },
  ];
  return (
    <>
      <Select placeholder="장르선택" options={genre} />
      <Select placeholder="국가선택" options={country} />
    </>
  );
}

export default SelectOption;
