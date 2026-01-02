import { GradeCurriculum, Topic, LessonType } from '@/types';

// Complete curriculum data based on "Kết nối tri thức với cuộc sống" textbook
export const curriculum: GradeCurriculum[] = [
    {
        grade: 6,
        topics: [
            {
                id: 'grade6-topicI',
                name: 'Chủ đề 1: Xây dựng ý tưởng trong sáng tác mĩ thuật',
                description: 'Tìm hiểu cách xây dựng ý tưởng và thể loại mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topicI-lesson1',
                        name: 'Bài 1: Một số thể loại mĩ thuật',
                        description: 'Tìm hiểu về các thể loại mỹ thuật khác nhau'
                    },
                    {
                        id: 'grade6-topicI-lesson2',
                        name: 'Bài 2: Xây dựng ý tưởng trong sáng tác theo chủ đề',
                        description: 'Học cách xây dựng ý tưởng sáng tạo theo chủ đề'
                    }
                ]
            },
            {
                id: 'grade6-topicII',
                name: 'Chủ đề 2: Ngôi nhà yêu thương',
                description: 'Khám phá vẻ đẹp của ngôi nhà qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topicII-lesson1',
                        name: 'Bài 3: Tạo hình ngôi nhà',
                        description: 'Vẽ và tạo hình ngôi nhà trong tác phẩm mỹ thuật'
                    },
                    {
                        id: 'grade6-topicII-lesson2',
                        name: 'Bài 4: Thiết kế quà lưu niệm',
                        description: 'Thiết kế quà lưu niệm với chủ đề ngôi nhà'
                    }
                ]
            },
            {
                id: 'grade6-topicIII',
                name: 'Chủ đề 3: Hoạt động trong trường học',
                description: 'Thể hiện các hoạt động học đường qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topicIII-lesson1',
                        name: 'Bài 5: Tạo hình hoạt động trong nhà trường',
                        description: 'Vẽ các hoạt động trong trường học'
                    },
                    {
                        id: 'grade6-topicIII-lesson2',
                        name: 'Bài 6: Thiết kế đồ chơi',
                        description: 'Thiết kế đồ chơi sáng tạo'
                    }
                ]
            },
            {
                id: 'grade6-topicIV',
                name: 'Chủ đề 4: Mĩ thuật thời kì tiền sử',
                description: 'Khám phá mỹ thuật thế giới và Việt Nam thời tiền sử',
                lessonTypes: [
                    {
                        id: 'grade6-topicIV-lesson1',
                        name: 'Bài 7: Mĩ thuật thế giới thời kì tiền sử',
                        description: 'Tìm hiểu nghệ thuật hang động và tạo hình nguyên thủy'
                    },
                    {
                        id: 'grade6-topicIV-lesson2',
                        name: 'Bài 8: Mĩ thuật Việt Nam thời kì tiền sử',
                        description: 'Khám phá văn hóa Đông Sơn và nghệ thuật cổ Việt Nam'
                    }
                ]
            },
            {
                id: 'grade6-topicV',
                name: 'Chủ đề 5: Trò chơi dân gian',
                description: 'Khám phá trò chơi dân gian qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topicV-lesson1',
                        name: 'Bài 9: Sáng tạo mĩ thuật với trò chơi dân gian',
                        description: 'Thể hiện trò chơi dân gian trong sáng tác mỹ thuật'
                    },
                    {
                        id: 'grade6-topicV-lesson2',
                        name: 'Bài 10: Thiết kế thiệp chúc mừng',
                        description: 'Thiết kế thiệp chúc mừng sáng tạo'
                    }
                ]
            },
            {
                id: 'grade6-topicVI',
                name: 'Chủ đề 6: Sắc màu lễ hội',
                description: 'Khám phá màu sắc và không khí lễ hội',
                lessonTypes: [
                    {
                        id: 'grade6-topicVI-lesson1',
                        name: 'Bài 11: Hoà sắc trong tranh chủ đề lễ hội',
                        description: 'Học cách phối màu trong tranh lễ hội'
                    },
                    {
                        id: 'grade6-topicVI-lesson2',
                        name: 'Bài 12: Màu sắc lễ hội trong thiết kế lịch treo tường',
                        description: 'Thiết kế lịch treo tường với chủ đề lễ hội'
                    }
                ]
            },
            {
                id: 'grade6-topicVII',
                name: 'Chủ đề 7: Cuộc sống thường ngày',
                description: 'Thể hiện cuộc sống hàng ngày qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade6-topicVII-lesson1',
                        name: 'Bài 13: Sáng tạo mĩ thuật với hình ảnh trong cuộc sống',
                        description: 'Vẽ tranh về cuộc sống thường ngày'
                    },
                    {
                        id: 'grade6-topicVII-lesson2',
                        name: 'Bài 14: Thiết kế thời gian biểu',
                        description: 'Thiết kế thời gian biểu sáng tạo'
                    }
                ]
            },
            {
                id: 'grade6-topicVIII',
                name: 'Chủ đề 8: Mĩ thuật thời kì cổ đại',
                description: 'Tìm hiểu mỹ thuật thế giới và Việt Nam thời cổ đại',
                lessonTypes: [
                    {
                        id: 'grade6-topicVIII-lesson1',
                        name: 'Bài 15: Mĩ thuật thế giới thời kì cổ đại',
                        description: 'Nghiên cứu mỹ thuật các nền văn minh cổ đại'
                    },
                    {
                        id: 'grade6-topicVIII-lesson2',
                        name: 'Bài 16: Mĩ thuật Việt Nam thời kì cổ đại',
                        description: 'Khám phá di sản mỹ thuật Việt Nam cổ đại'
                    }
                ]
            }
        ]
    },
    {
        grade: 7,
        topics: [
            {
                id: 'grade7-topicI',
                name: 'Chủ đề 1: Mĩ thuật thế giới thời kì trung đại',
                description: 'Tìm hiểu nghệ thuật thế giới thời trung đại',
                lessonTypes: [
                    {
                        id: 'grade7-topicI-lesson1',
                        name: 'Bài 1: Mĩ thuật tạo hình thời kì trung đại',
                        description: 'Nghiên cứu hội họa và điêu khắc thời trung đại'
                    },
                    {
                        id: 'grade7-topicI-lesson2',
                        name: 'Bài 2: Mĩ thuật ứng dụng thời kì trung đại',
                        description: 'Khám phá kiến trúc và trang trí thời trung đại'
                    }
                ]
            },
            {
                id: 'grade7-topicII',
                name: 'Chủ đề 2: Vẻ đẹp di tích',
                description: 'Khám phá và thể hiện vẻ đẹp di tích lịch sử',
                lessonTypes: [
                    {
                        id: 'grade7-topicII-lesson1',
                        name: 'Bài 3: Hình ảnh di tích trong sáng tạo mĩ thuật',
                        description: 'Vẽ và tạo hình các di tích lịch sử'
                    },
                    {
                        id: 'grade7-topicII-lesson2',
                        name: 'Bài 4: Hình ảnh di tích trong thiết kế tem bưu chính',
                        description: 'Thiết kế tem với hình ảnh di tích'
                    }
                ]
            },
            {
                id: 'grade7-topicIII',
                name: 'Chủ đề 3: Yếu tố dân tộc trong mĩ thuật',
                description: 'Tìm hiểu đặc trưng dân tộc trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topicIII-lesson1',
                        name: 'Bài 5: Yếu tố dân tộc trong tranh của một số họa sĩ',
                        description: 'Nghiên cứu tác phẩm của họa sĩ dân tộc Việt Nam'
                    },
                    {
                        id: 'grade7-topicIII-lesson2',
                        name: 'Bài 6: Thiết kế logo',
                        description: 'Tạo logo với yếu tố văn hóa dân tộc'
                    }
                ]
            },
            {
                id: 'grade7-topicIV',
                name: 'Chủ đề 4: Vẻ đẹp trong tác phẩm hội họa',
                description: 'Phân tích và cảm nhận vẻ đẹp trong tranh',
                lessonTypes: [
                    {
                        id: 'grade7-topicIV-lesson1',
                        name: 'Bài 7: Không gian trong tác phẩm hội họa trung đại',
                        description: 'Tìm hiểu cách tạo không gian trong tranh'
                    },
                    {
                        id: 'grade7-topicIV-lesson2',
                        name: 'Bài 8: Tranh tĩnh vật',
                        description: 'Vẽ và cảm nhận tranh tĩnh vật'
                    }
                ]
            },
            {
                id: 'grade7-topicV',
                name: 'Chủ đề 5: Hiện thực cuộc sống trong sáng tạo mĩ thuật',
                description: 'Thể hiện cuộc sống thực qua nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topicV-lesson1',
                        name: 'Bài 9: Tìm hiểu nguồn sáng trong tranh',
                        description: 'Nghiên cứu ánh sáng và bóng tối trong hội họa'
                    },
                    {
                        id: 'grade7-topicV-lesson2',
                        name: 'Bài 10: Thiết kế tạo mẫu trang phục',
                        description: 'Tạo mẫu trang phục từ cuộc sống'
                    }
                ]
            },
            {
                id: 'grade7-topicVI',
                name: 'Chủ đề 6: Tạo hình ngôi nhà trong sáng tạo mĩ thuật',
                description: 'Thể hiện ngôi nhà qua các vật liệu khác nhau',
                lessonTypes: [
                    {
                        id: 'grade7-topicVI-lesson1',
                        name: 'Bài 11: Tạo hình ngôi nhà từ vật liệu sẵn có',
                        description: 'Sáng tạo mô hình ngôi nhà'
                    },
                    {
                        id: 'grade7-topicVI-lesson2',
                        name: 'Bài 12: Tranh cổ động',
                        description: 'Vẽ tranh cổ động tuyên truyền'
                    }
                ]
            },
            {
                id: 'grade7-topicVII',
                name: 'Chủ đề 7: Sum họp gia đình',
                description: 'Thể hiện đề tài gia đình trong mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade7-topicVII-lesson1',
                        name: 'Bài 13: Đề tài gia đình trong sáng tạo mĩ thuật',
                        description: 'Vẽ tranh với chủ đề gia đình'
                    },
                    {
                        id: 'grade7-topicVII-lesson2',
                        name: 'Bài 14: Thiết kế khung ảnh từ vật liệu sẵn có',
                        description: 'Làm khung ảnh từ vật liệu sẵn có'
                    }
                ]
            },
            {
                id: 'grade7-topicVIII',
                name: 'Chủ đề 8: Mĩ thuật Việt Nam thời kì trung đại',
                description: 'Khám phá di sản mỹ thuật Việt Nam thời trung đại',
                lessonTypes: [
                    {
                        id: 'grade7-topicVIII-lesson1',
                        name: 'Bài 15: Di sản mĩ thuật Việt Nam thời kì trung đại',
                        description: 'Tìm hiểu kiến trúc và điêu khắc Việt Nam thời trung đại'
                    },
                    {
                        id: 'grade7-topicVIII-lesson2',
                        name: 'Bài 16: Khai thác giá trị tạo hình truyền thống',
                        description: 'Ứng dụng giá trị mỹ thuật truyền thống'
                    }
                ]
            }
        ]
    },
    {
        grade: 8,
        topics: [
            {
                id: 'grade8-topicI',
                name: 'Chủ đề 1: Hình tượng con người trong mĩ thuật',
                description: 'Tìm hiểu cách thể hiện con người trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topicI-lesson1',
                        name: 'Bài 1: Hình tượng con người trong sáng tạo mĩ thuật',
                        description: 'Vẽ chân dung và hình thể con người'
                    },
                    {
                        id: 'grade8-topicI-lesson2',
                        name: 'Bài 2: Một số dạng bố cục trong tranh sinh hoạt',
                        description: 'Học các dạng bố cục khi vẽ người'
                    }
                ]
            },
            {
                id: 'grade8-topicII',
                name: 'Chủ đề 2: Vẻ đẹp trong nghệ thuật truyền thống',
                description: 'Khám phá giá trị nghệ thuật truyền thống',
                lessonTypes: [
                    {
                        id: 'grade8-topicII-lesson1',
                        name: 'Bài 3: Nghệ thuật truyền thống',
                        description: 'Tìm hiểu tranh dân gian, đồ gốm truyền thống'
                    },
                    {
                        id: 'grade8-topicII-lesson2',
                        name: 'Bài 4: Thiết kế trang phục với hoa văn dân tộc thiểu số',
                        description: 'Tạo trang phục với hoa văn dân tộc thiểu số'
                    }
                ]
            },
            {
                id: 'grade8-topicIII',
                name: 'Chủ đề 3: Niềm vui, hạnh phúc',
                description: 'Thể hiện cảm xúc tích cực qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topicIII-lesson1',
                        name: 'Bài 5: Tác phẩm hội họa chủ đề niềm vui, hạnh phúc',
                        description: 'Vẽ tranh thể hiện niềm vui và hạnh phúc'
                    },
                    {
                        id: 'grade8-topicIII-lesson2',
                        name: 'Bài 6: Thiết kế quà sinh nhật từ vật liệu sẵn có',
                        description: 'Tạo quà tặng sinh nhật sáng tạo'
                    }
                ]
            },
            {
                id: 'grade8-topicIV',
                name: 'Chủ đề 4: Mĩ thuật thế giới thời kì hiện đại',
                description: 'Tìm hiểu các trường phái mỹ thuật hiện đại',
                lessonTypes: [
                    {
                        id: 'grade8-topicIV-lesson1',
                        name: 'Bài 7: Một số trường phái mĩ thuật phương Tây hiện đại',
                        description: 'Nghiên cứu ấn tượng, lập thể, siêu thực'
                    },
                    {
                        id: 'grade8-topicIV-lesson2',
                        name: 'Bài 8: Nghệ thuật trang trí đồ gia dụng',
                        description: 'Trang trí đồ vật theo phong cách hiện đại'
                    }
                ]
            },
            {
                id: 'grade8-topicV',
                name: 'Chủ đề 5: Vẻ đẹp trong lao động',
                description: 'Tôn vinh vẻ đẹp của người lao động',
                lessonTypes: [
                    {
                        id: 'grade8-topicV-lesson1',
                        name: 'Bài 9: Vẻ đẹp người lao động trong sáng tạo mĩ thuật',
                        description: 'Vẽ tranh về người lao động'
                    },
                    {
                        id: 'grade8-topicV-lesson2',
                        name: 'Bài 10: Nghệ thuật trổ giấy trong trang trí',
                        description: 'Tạo tác phẩm trổ giấy với chủ đề lao động'
                    }
                ]
            },
            {
                id: 'grade8-topicVI',
                name: 'Chủ đề 6: Giao thông công cộng trong sáng tạo mĩ thuật',
                description: 'Thể hiện giao thông đô thị qua mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topicVI-lesson1',
                        name: 'Bài 11: Phương tiện giao thông công cộng trong mĩ thuật',
                        description: 'Vẽ tranh về phương tiện giao thông'
                    },
                    {
                        id: 'grade8-topicVI-lesson2',
                        name: 'Bài 12: Thiết kế trang trí áo phông',
                        description: 'Tạo poster tuyên truyền giao thông trên áo phông'
                    }
                ]
            },
            {
                id: 'grade8-topicVII',
                name: 'Chủ đề 7: Mĩ thuật Việt Nam thời kì hiện đại',
                description: 'Tìm hiểu nghệ thuật đương đại Việt Nam',
                lessonTypes: [
                    {
                        id: 'grade8-topicVII-lesson1',
                        name: 'Bài 13: Một số tác giả, tác phẩm mĩ thuật Việt Nam hiện đại',
                        description: 'Nghiên cứu tác giả, tác phẩm Việt Nam hiện đại'
                    },
                    {
                        id: 'grade8-topicVII-lesson2',
                        name: 'Bài 14: Nghệ thuật thiết kế Việt Nam thời kì hiện đại',
                        description: 'Tìm hiểu thiết kế Việt Nam thời kì hiện đại'
                    }
                ]
            },
            {
                id: 'grade8-topicVIII',
                name: 'Chủ đề 8: Hướng nghiệp',
                description: 'Giới thiệu nghề nghiệp liên quan đến mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade8-topicVIII-lesson1',
                        name: 'Bài 15: Ngành nghề liên quan đến mĩ thuật tạo hình',
                        description: 'Tìm hiểu các ngành nghề mĩ thuật tạo hình'
                    },
                    {
                        id: 'grade8-topicVIII-lesson2',
                        name: 'Bài 16: Đặc trưng ngành nghề mĩ thuật tạo hình',
                        description: 'Khám phá yêu cầu và kỹ năng nghề mĩ thuật tạo hình'
                    }
                ]
            }
        ]
    },
    {
        grade: 9,
        topics: [
            {
                id: 'grade9-topicI',
                name: 'Chủ đề 1: Cuộc sống muôn màu',
                description: 'Thể hiện sự đa dạng của cuộc sống',
                lessonTypes: [
                    {
                        id: 'grade9-topicI-lesson1',
                        name: 'Bài 1: Vẻ đẹp cuộc sống trong tác phẩm mĩ thuật',
                        description: 'Vẽ tranh về cuộc sống hàng ngày'
                    },
                    {
                        id: 'grade9-topicI-lesson2',
                        name: 'Bài 2: Thiết kế phụ kiện thời trang',
                        description: 'Tạo phụ kiện thời trang sáng tạo'
                    }
                ]
            },
            {
                id: 'grade9-topicII',
                name: 'Chủ đề 2: Nghệ thuật đương đại thế giới',
                description: 'Tìm hiểu xu hướng nghệ thuật đương đại',
                lessonTypes: [
                    {
                        id: 'grade9-topicII-lesson1',
                        name: 'Bài 3: Một số trào lưu nghệ thuật đương đại thế giới',
                        description: 'Nghiên cứu các trào lưu nghệ thuật mới'
                    },
                    {
                        id: 'grade9-topicII-lesson2',
                        name: 'Bài 4: Thiết kế giá đỡ thiết bị công nghệ',
                        description: 'Đặc điểm thiết kế giá đỡ thiết bị công nghệ'
                    }
                ]
            },
            {
                id: 'grade9-topicIII',
                name: 'Chủ đề 3: Thiết kế mĩ thuật sách',
                description: 'Học thiết kế sách và minh họa',
                lessonTypes: [
                    {
                        id: 'grade9-topicIII-lesson1',
                        name: 'Bài 5: Thiết kế bìa sách',
                        description: 'Tạo bìa sách hấp dẫn và chuyên nghiệp'
                    },
                    {
                        id: 'grade9-topicIII-lesson2',
                        name: 'Bài 6: Tranh minh họa',
                        description: 'Vẽ tranh minh họa cho sách'
                    }
                ]
            },
            {
                id: 'grade9-topicIV',
                name: 'Chủ đề 4: Cảm hứng trong sáng tác mĩ thuật',
                description: 'Khám phá nguồn cảm hứng sáng tạo',
                lessonTypes: [
                    {
                        id: 'grade9-topicIV-lesson1',
                        name: 'Bài 7: Cảm hứng trong sáng tác hội họa',
                        description: 'Tìm và phát triển cảm hứng vẽ tranh'
                    },
                    {
                        id: 'grade9-topicIV-lesson2',
                        name: 'Bài 8: Thiết kế hình ảnh nhận diện thương hiệu',
                        description: 'Tạo hình ảnh nhận diện thương hiệu'
                    }
                ]
            },
            {
                id: 'grade9-topicV',
                name: 'Chủ đề 5: Vẻ đẹp nguyên mẫu trong thực hành sáng tạo',
                description: 'Nghiên cứu nguyên mẫu trong nghệ thuật',
                lessonTypes: [
                    {
                        id: 'grade9-topicV-lesson1',
                        name: 'Bài 9: Tỉ lệ và hình khối của đồ vật',
                        description: 'Học về tỷ lệ và hình khối của đồ vật'
                    },
                    {
                        id: 'grade9-topicV-lesson2',
                        name: 'Bài 10: Nguyên mẫu trong tác phẩm điêu khắc',
                        description: 'Tìm hiểu nguyên mẫu trong tác phẩm điêu khắc'
                    }
                ]
            },
            {
                id: 'grade9-topicVI',
                name: 'Chủ đề 6: Nghệ thuật múa rối',
                description: 'Khám phá nghệ thuật múa rối truyền thống',
                lessonTypes: [
                    {
                        id: 'grade9-topicVI-lesson1',
                        name: 'Bài 11: Vẻ đẹp tạo hình con rối',
                        description: 'Nghiên cứu tạo hình con rối'
                    },
                    {
                        id: 'grade9-topicVI-lesson2',
                        name: 'Bài 12: Tạo hình nhân vật múa rối nước',
                        description: 'Thiết kế nhân vật múa rối nước'
                    }
                ]
            },
            {
                id: 'grade9-topicVII',
                name: 'Chủ đề 7: Mĩ thuật đương đại Việt Nam',
                description: 'Tìm hiểu nghệ thuật đương đại Việt Nam',
                lessonTypes: [
                    {
                        id: 'grade9-topicVII-lesson1',
                        name: 'Bài 13: Khuynh hướng sáng tác mĩ thuật',
                        description: 'Nghiên cứu khuynh hướng sáng tác Việt Nam đương đại'
                    },
                    {
                        id: 'grade9-topicVII-lesson2',
                        name: 'Bài 14: Thiết kế đồ gia dụng từ vật liệu tái chế',
                        description: 'Tạo đồ gia dụng từ vật liệu tái chế'
                    }
                ]
            },
            {
                id: 'grade9-topicVIII',
                name: 'Chủ đề 8: Hướng nghiệp',
                description: 'Giới thiệu nghề nghiệp liên quan đến mỹ thuật',
                lessonTypes: [
                    {
                        id: 'grade9-topicVIII-lesson1',
                        name: 'Bài 15: Ngành nghề liên quan đến mĩ thuật ứng dụng',
                        description: 'Tìm hiểu các ngành nghề thiết kế, mỹ thuật'
                    },
                    {
                        id: 'grade9-topicVIII-lesson2',
                        name: 'Bài 16: Đặc trưng ngành nghề mĩ thuật ứng dụng',
                        description: 'Khám phá yêu cầu và kỹ năng nghề mỹ thuật ứng dụng'
                    }
                ]
            }
        ]
    }
];

// Helper function to get curriculum by grade
export const getCurriculumByGrade = (grade: 6 | 7 | 8 | 9): GradeCurriculum | undefined => {
    return curriculum.find(c => c.grade === grade);
};

// Helper function to get topic by ID
export const getTopicById = (topicId: string): Topic | undefined => {
    for (const gradeCurriculum of curriculum) {
        const topic = gradeCurriculum.topics.find(t => t.id === topicId);
        if (topic) return topic;
    }
    return undefined;
};

// Helper function to get lesson type by ID
export const getLessonTypeById = (lessonTypeId: string): LessonType | undefined => {
    for (const gradeCurriculum of curriculum) {
        for (const topic of gradeCurriculum.topics) {
            const lessonType = topic.lessonTypes.find(lt => lt.id === lessonTypeId);
            if (lessonType) return lessonType;
        }
    }
    return undefined;
};
