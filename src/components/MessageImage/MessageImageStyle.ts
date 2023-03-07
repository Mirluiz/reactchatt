export const style = `
.rc-message-image_container {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  display: flex;
  align-items: flex-end;
}

.rc-message-image_body {
  display: flex;
  flex-direction: column;
  border-radius: var(--rc-shape-border-radius);
  border: 1px solid white;
  overflow: hidden;
  margin-left: 5px;
  margin-right: 5px;
}

.rc-singleImage_container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.rc-images_container {
  width: 100%;
}

.rc-lu {
    list-style: none;
    display: grid;
    padding: 0px;
    margin: 0px;
}

.rc-li:first-of-type {
   margin-right: 2px;
}

.rc-li {
  margin-bottom: 2px;
}

.rc-li_image {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.rc-li-group_image {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
}

`;
