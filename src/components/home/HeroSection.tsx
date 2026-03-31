import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export default function HeroSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* 头像 */}
          <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-primary/20 shadow-lg">
            <AvatarImage 
              src="https://miaoda-site-img.cdn.bcebos.com/images/baidu_image_search_fb58693b-6ea4-40d9-a8e9-dc755f6b0745.jpg" 
              alt="Alicia"
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-primary text-3xl">A</AvatarFallback>
          </Avatar>
          
          {/* title */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Alicia的鹿窝
          </h1>
          
          {/* 一句话介绍 */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-md font-fredoka">
            Day before yesterday I saw a rabbit, and yesterday a deer, and today, you.
          </p>
        </div>
      </div>
    </section>
  );
}